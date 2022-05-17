import { Field, Formik } from 'formik'
import React from 'react'
import { Button, Col, Form, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import SanPhamApi from '../../../api/SanPhamApi'
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import reduxNotification from '../../../components/ReduxNotification'

const ModalDescription = ({ isOpen, closeModal, refreshForm, selectedItem }) => {

    return (
        <Modal show={isOpen} size='lg'>
            <ModalHeader>
                Thao tác mô tả sản phẩm
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </ModalHeader>
            <ModalBody className="text-left m-3">
                <Formik
                    initialValues={{
                        moTa: selectedItem.moTa
                    }}
                    onSubmit={async (values) => {
                        try {
                            await SanPhamApi.updateDescSP(values, selectedItem.maSP);
                            closeModal()
                            reduxNotification.showSuccessNotification(
                                "Update Product",
                                "Update Desc Product Successfully!");
                            refreshForm()
                        } catch (error) {
                            console.log(error);
                            reduxNotification.showWrongNotification(
                                "Error When Update Desc Product",
                                "Update Desc Product Failed!");
                        }
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        isValid,
                        errors,
                        setFieldValue
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Mô tả</Form.Label>
                                    <Field name="moTa">
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