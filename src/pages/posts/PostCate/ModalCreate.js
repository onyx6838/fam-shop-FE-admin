import { Formik } from 'formik'
import React from 'react'
import { Button, Col, Form, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap'
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import TheLoaiBaiVietApi from '../../../api/TheLoaiBaiVietApi'
import reduxNotification from '../../../components/ReduxNotification';

const ModalCreate = ({ isOpen, closeModal, refreshForm }) => {
    return (
        <Modal show={isOpen}>
            <ModalHeader>
                Thêm mới
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </ModalHeader>
            <ModalBody className="text-left m-3">
                <Formik
                    initialValues={{
                        tenTheLoaiBaiViet: "",
                        duongDan: ""
                    }}
                    onSubmit={async (values) => {
                        try {
                            await TheLoaiBaiVietApi.createTheLoai(values);
                            closeModal()
                            reduxNotification.showSuccessNotification(
                                "Tạo thể loại bài viết",
                                "Tạo thể loại bài viết thành công!");
                            refreshForm()
                        } catch (error) {
                            console.log(error);
                            reduxNotification.showWrongNotification(
                                "Lỗi khi tạo thể loại bài viết",
                                "Tạo thể loại bài viết lỗi!");
                        }
                    }}>
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        errors
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Tên Thể Loại</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="tenTheLoaiBaiViet"
                                        value={values.tenTheLoaiBaiViet}
                                        onChange={handleChange}
                                        isValid={touched.tenTheLoaiBaiViet && !errors.tenTheLoaiBaiViet}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Đường Dẫn</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="duongDan"
                                        value={values.duongDan}
                                        onChange={handleChange}
                                        isValid={touched.duongDan && !errors.duongDan}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Button type="submit">Lưu</Button>
                        </Form>
                    )}
                </Formik>
            </ModalBody>
        </Modal>
    )
}

export default ModalCreate