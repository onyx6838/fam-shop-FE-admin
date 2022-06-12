import { useFormik } from 'formik';
import React from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import reduxNotification from '../../../components/ReduxNotification';
import Select from "react-select";
import TaiKhoanApi from '../../../api/TaiKhoanApi'

const ModalCreateAccount = ({ isOpen, closeModal, refreshForm }) => {
    const onSubmitForm = async (values, { resetForm }) => {
        try {
            const response = TaiKhoanApi.extByTenTK(values.tenTK);
            response.then((rs) => {
                if (rs) {
                    reduxNotification.showWrongNotification(
                        "Tên tài khoản đã tồn tại",
                        "Đã xảy ra lỗi");
                } else {
                    const response1 = TaiKhoanApi.extByEmail(values.email);
                    response1.then(async (rs) => {
                        if (rs) {
                            reduxNotification.showWrongNotification(
                                "Email đã tồn tại",
                                "Đã xảy ra lỗi");
                        } else {
                            await TaiKhoanApi.addTaiKhoan(values);
                            resetForm()
                            reduxNotification.showSuccessNotification(
                                "Thêm tài khoản",
                                "Thêm tài khoản thành công !!");
                            closeModal()
                            refreshForm()
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error);
            reduxNotification.showWrongNotification(
                "Lỗi khi thêm tài khoản",
                "Thêm tài khoản lỗi !!");
        }
    }

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

    const formik = useFormik({
        initialValues: {
            diaChi: "",
            hoTen: "",
            tenTK: "",
            matKhau: "",
            sdt: "",
            email: "",
            loaiTK: ""
        },
        onSubmit: onSubmitForm,
        validateOnChange: false,
        validateOnBlur: false
    });

    return (
        <Modal show={isOpen}>
            <Modal.Header>
                Thêm mới
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
                            <Form.Label>Tên Tài Khoản</Form.Label>
                            <Form.Control
                                type="text"
                                name="tenTK"
                                value={formik.values.tenTK}
                                onChange={formik.handleChange}
                                isValid={formik.touched.tenTK && !formik.errors.tenTK}
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
                                name="loaiTK"
                                onChange={selectedOption => {
                                    formik.setFieldValue("loaiTK", selectedOption.value);
                                }}
                            />
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

export default ModalCreateAccount