import { useFormik } from 'formik';
import React from 'react'
import { Button, Modal, Form, Col, Row } from 'react-bootstrap'
import TaiKhoanApi from '../../../api/TaiKhoanApi'
import reduxNotification from '../../../components/ReduxNotification';
import Select from "react-select";

const ModalUpdateAccount = ({ isOpen, closeModal, selectedItem, refreshForm }) => {
    const onSubmitForm = async (values, { resetForm }) => {
        try {
            await TaiKhoanApi.updateAccount(selectedItem.maTK, values);
            resetForm()
            reduxNotification.showSuccessNotification(
                "Sửa tài khoản",
                "Sửa tài khoản thành công !!");
            closeModal()
            refreshForm()
        } catch (error) {
            console.log(error);
            reduxNotification.showWrongNotification(
                "Lỗi khi sửa tài khoản",
                "Sửa tài khoản lỗi !!");
        }
    }

    const formik = useFormik({
        initialValues: {
            diaChi: selectedItem.diaChi ? selectedItem.diaChi : "",
            hoTen: selectedItem.hoTen ? selectedItem.hoTen : "",
            matKhau: "",
            sdt: selectedItem.sdt ? selectedItem.sdt : "",
            email: selectedItem.email ? selectedItem.email : "",
            loaiTK: selectedItem.loaiTK
        },
        onSubmit: onSubmitForm,
        validateOnChange: false,
        validateOnBlur: false
    });

    const roleOptions = [
        {
            value: "QUAN_TRI",
            label: "QUẢN TRỊ"
        },
        {
            value: "NGUOI_DUNG",
            label: "NGƯỜI DÙNG"
        },
        {
            value: "NHA_CUNG_CAP",
            label: "NHÀ CUNG CẤP"
        },
        {
            value: "NHAN_VIEN",
            label: "NHÂN VIÊN"
        },
        {
            value: "SHIPPER",
            label: "SHIPPER"
        }
    ];

    const defaultValue = (options, value) => {
        return options ? options.find(option => option.value === value) : "";
    };

    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header>
                <Modal.Title>Cập nhật tài khoản</Modal.Title>
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                                type="text"
                                name="diaChi"
                                value={formik.values.diaChi}
                                onChange={formik.handleChange}
                                isValid={formik.touched.diaChi && !formik.errors.diaChi}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="12">
                            <Form.Label>Họ Tên</Form.Label>
                            <Form.Control
                                type="text"
                                name="hoTen"
                                value={formik.values.hoTen}
                                onChange={formik.handleChange}
                                isValid={formik.touched.hoTen && !formik.errors.hoTen}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="12">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                name="matKhau"
                                value={formik.values.matKhau}
                                onChange={formik.handleChange}
                                isValid={formik.touched.matKhau && !formik.errors.matKhau}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="12">
                            <Form.Label>SĐT</Form.Label>
                            <Form.Control
                                type="text"
                                name="sdt"
                                value={formik.values.sdt}
                                onChange={formik.handleChange}
                                isValid={formik.touched.sdt && !formik.errors.sdt}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="12">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                isValid={formik.touched.email && !formik.errors.email}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="12" className="mb-3">
                            <Form.Label>Loại Tài Khoản</Form.Label>
                            <Select
                                className="react-select-container"
                                classNamePrefix="react-select"
                                options={roleOptions}
                                value={defaultValue(roleOptions, formik.values.loaiTK)}
                                name="loaiTK"
                                onChange={selectedOption => {
                                    formik.setFieldValue("loaiTK", selectedOption.value);
                                }}
                            />
                        </Form.Group>
                    </Row>
                    <Button type="submit">Cập nhật</Button>
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

export default ModalUpdateAccount