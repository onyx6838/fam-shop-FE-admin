import React from 'react'
import { Button, Col, Modal, Row, Form } from 'react-bootstrap'
import { useFormik } from 'formik';
import reduxNotification from '../../../components/ReduxNotification';
import DacTrungApi from '../../../api/DacTrungApi'

const ModalUpdateFeature = ({ isOpen, closeModal, selectedItem, refreshForm }) => {
    const onSubmitForm = async (values, { resetForm }) => {
        try {
            await DacTrungApi.updateDacTrung(selectedItem.maDacTrung, { ...values, "loaiDacTrung": selectedItem.loaiDacTrung });
            resetForm()
            closeModal()
            reduxNotification.showSuccessNotification(
                "Sửa đặc trưng đại diện",
                "Sửa đặc trưng đại diện thành công !!");
            refreshForm()
        } catch (error) {
            console.log(error);
            reduxNotification.showWrongNotification(
                "Lỗi khi sửa đặc trưng đại diện",
                "Sửa đặc trưng lỗi !!");
        }
    }

    const formik = useFormik({
        initialValues: {
            ten: selectedItem.ten ? selectedItem.ten : "",
            moTa: selectedItem.moTa ? selectedItem.moTa : "",
            giaTri: selectedItem.giaTri ? selectedItem.giaTri : "",
            donVi: selectedItem.donVi ? selectedItem.donVi : ""
        },
        onSubmit: onSubmitForm,
        validateOnChange: false,
        validateOnBlur: false
    });

    return (
        <Modal show={isOpen}>
            <Modal.Header >
                <Modal.Title>Cập nhật loại đặc trưng đại diện</Modal.Title>
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                            <Form.Label>Tên</Form.Label>
                            <Form.Control
                                type="text"
                                name="ten"
                                value={formik.values.ten}
                                onChange={formik.handleChange}
                                isValid={formik.touched.ten && !formik.errors.ten}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="12">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                                type="text"
                                name="moTa"
                                value={formik.values.moTa}
                                onChange={formik.handleChange}
                                isValid={formik.touched.moTa && !formik.errors.moTa}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="12">
                            <Form.Label>Giá trị</Form.Label>
                            <Form.Control
                                type="text"
                                name="giaTri"
                                value={formik.values.giaTri}
                                onChange={formik.handleChange}
                                isValid={formik.touched.giaTri && !formik.errors.giaTri}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="12">
                            <Form.Label>Đơn vị</Form.Label>
                            <Form.Control
                                type="text"
                                name="donVi"
                                value={formik.values.donVi}
                                onChange={formik.handleChange}
                                isValid={formik.touched.donVi && !formik.errors.donVi}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button type="submit">Lưu</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalUpdateFeature