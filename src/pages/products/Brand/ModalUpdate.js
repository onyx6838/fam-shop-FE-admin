import { useFormik } from 'formik'
import React from 'react'
import { Button, Col, Form, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap'
import reduxNotification from '../../../components/ReduxNotification'
import ThuongHieuApi from '../../../api/ThuongHieuApi'

const ModalUpdate = ({ isOpen, closeModal, refreshForm, selectedItem }) => {
    const submitForm = async (values, { resetForm }) => {
        try {
            await ThuongHieuApi.updateThuongHieu(selectedItem.maThuongHieu, values);
            closeModal()
            reduxNotification.showSuccessNotification(
                "Cập nhật thương hiệu",
                "Cập nhật thương hiệu thành công!");
            resetForm();
            refreshForm();
        } catch (error) {
            console.log(error);
            reduxNotification.showWrongNotification(
                "Lỗi khi cập nhật thương hiệu",
                "Cập nhật thương hiệu lỗi!");
        }
    }

    const formik = useFormik({
        initialValues: {
            tenThuongHieu: selectedItem.tenThuongHieu
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
                            <Form.Label>Tên Thương Hiệu</Form.Label>
                            <Form.Control
                                type="text"
                                name="tenThuongHieu"
                                value={formik.values.tenThuongHieu}
                                onChange={formik.handleChange}
                                isValid={formik.touched.tenThuongHieu && !formik.errors.tenThuongHieu}
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