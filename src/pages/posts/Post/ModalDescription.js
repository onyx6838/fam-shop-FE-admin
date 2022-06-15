import { Field, Formik } from 'formik'
import React from 'react'
import { Button, Col, Form, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import BaiVietApi from '../../../api/BaiVietApi'
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import reduxNotification from '../../../components/ReduxNotification'

const ModalDescription = ({ isOpen, closeModal, refreshForm, selectedItem }) => {
    return (
        <Modal show={isOpen} size='lg'>
            <ModalHeader>
                Nội dung
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </ModalHeader>
            <ModalBody className="text-left m-3">
                <Formik
                    initialValues={{
                        noiDung: selectedItem.noiDung
                    }}
                    onSubmit={async (values) => {
                        try {
                            await BaiVietApi.updateDescBV(values, selectedItem.maBaiViet);
                            closeModal()
                            reduxNotification.showSuccessNotification(
                                "Cập nhật nội dung",
                                "Cập nhật nội dung thành công!");
                            refreshForm()
                        } catch (error) {
                            console.log(error);
                            reduxNotification.showWrongNotification(
                                "Cập nhật nội dung",
                                "Cập nhật nội dung lỗi!");
                        }
                    }}>
                    {({
                        handleSubmit
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Nội dung</Form.Label>
                                    <Field name="noiDung">
                                        {({ field }) => <ReactQuill value={field.value} onChange={field.onChange(field.name)} />}
                                    </Field>
                                </Form.Group>
                            </Row>
                            <Button type="submit">Cập nhật</Button>
                        </Form>
                    )}
                </Formik>
            </ModalBody>
        </Modal>
    )
}

export default ModalDescription