import { useFormik } from 'formik'
import React from 'react'
import { Button, Col, Form, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap'
import reduxNotification from '../../../components/ReduxNotification'
import TheLoaiBaiVietApi from '../../../api/TheLoaiBaiVietApi'

const ModalUpdate = ({ isOpen, closeModal, refreshForm, selectedItem }) => {
    const submitForm = async (values, { resetForm }) => {
        try {
            await TheLoaiBaiVietApi.updateTLBV(selectedItem.maTheLoaiBaiViet, values);
            closeModal()
            reduxNotification.showSuccessNotification(
                "Cập nhật TLBV",
                "Cập nhật TLBV thành công!");
            refreshForm();
        } catch (error) {
            console.log(error);
            reduxNotification.showWrongNotification(
                "Lỗi khi cập nhật TLBV",
                "Cập nhật TLBV lỗi!");
        }
    }

    const formik = useFormik({
        initialValues: {
            tenTheLoaiBaiViet: selectedItem.tenTheLoaiBaiViet,
            duongDan: selectedItem.duongDan
        },
        onSubmit: submitForm,
        validateOnBlur: false,
        validateOnChange: false
    });

    return (
        <Modal show={isOpen} size='md'>
            <ModalHeader>
                Cập nhật
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </ModalHeader>
            <ModalBody className="text-left m-3">
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                            <Form.Label>Tên Thể Loại</Form.Label>
                            <Form.Control
                                type="text"
                                name="tenTheLoaiBaiViet"
                                value={formik.values.tenTheLoaiBaiViet}
                                onChange={formik.handleChange}
                                isValid={formik.touched.tenTheLoaiBaiViet && !formik.errors.tenTheLoaiBaiViet}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="12">
                            <Form.Label>Đường Dẫn</Form.Label>
                            <Form.Control
                                type="text"
                                name="duongDan"
                                value={formik.values.duongDan}
                                onChange={formik.handleChange}
                                isValid={formik.touched.duongDan && !formik.errors.duongDan}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button type="submit">Cập nhật</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default ModalUpdate