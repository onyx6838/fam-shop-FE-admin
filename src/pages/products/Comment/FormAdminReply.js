import { useFormik } from 'formik';
import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import DanhGiaApi from '../../../api/DanhGiaApi'
import reduxNotification from '../../../components/ReduxNotification';

const FormAdminReply = ({ selectedItem, maDanhGiaCha, adminIsReplyCmt, closeForm }) => {
    const userInfo = useSelector(state => state.user.userInfo)

    const onSubmitAdminReply = async (values, { resetForm }) => {
        const form =
        {
            tenNguoiDanhGia: userInfo.hoTen,
            emailNguoiDanhGia: userInfo.email,
            noiDung: values.noiDung,
            maSPDanhGia: selectedItem.maSP,
            maDanhGiaCha: maDanhGiaCha
        }
        Swal.fire({
            title: 'Quản trị bình luận ?',
            text: 'Thao tác bình luận',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                const response = DanhGiaApi.createQuanTriDanhGia(form)
                response.then((r) => {
                    reduxNotification.showSuccessNotification(
                        "Thêm bình luận quản trị",
                        "Thêm bình luận quản trị thành công !!");
                    resetForm()
                    closeForm()
                }).catch((error) => {
                    console.log(error);
                    reduxNotification.showWrongNotification(
                        "Thêm bình luận quản trị",
                        "Thêm bình luận quản trị lỗi !!");
                })
            }
        })
    }

    const onUpdateAdminReply = (values, { resetForm }) => {
        const form =
        {
            noiDung: values.noiDung
        }
        Swal.fire({
            title: 'Quản trị cập nhật bình luận ?',
            text: 'Thao tác bình luận',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const idAdminRep = await DanhGiaApi.getIdReplyQuanTri(maDanhGiaCha);
                const response = DanhGiaApi.updateQuanTriDanhGia(form, idAdminRep)
                response.then((r) => {
                    reduxNotification.showSuccessNotification(
                        "Cập nhật bình luận quản trị",
                        "Cập nhật bình luận quản trị thành công !!");
                    resetForm()
                    closeForm()
                }).catch((error) => {
                    console.log(error);
                    reduxNotification.showWrongNotification(
                        "Cập nhật bình luận quản trị",
                        "Cập nhật bình luận quản trị lỗi");
                })
            }
        })
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            noiDung: ''
        },
        onSubmit: onSubmitAdminReply,
        validateOnChange: false,
        validateOnBlur: false
    });

    const formikUpdate = useFormik({
        enableReinitialize: true,
        initialValues: {
            noiDung: ''
        },
        onSubmit: onUpdateAdminReply,
        validateOnChange: false,
        validateOnBlur: false
    });

    return (
        <>
            {
                !adminIsReplyCmt ?
                    (
                        <Form onSubmit={formik.handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Nội dung</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="noiDung"
                                        value={formik.values.noiDung}
                                        onChange={formik.handleChange}
                                    />
                                </Form.Group>
                            </Row>
                            <Button type="submit">Trả lời</Button>&nbsp;&nbsp;
                        </Form>
                    ) :
                    (
                        <Form onSubmit={formikUpdate.handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Nội dung</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="noiDung"
                                        value={formikUpdate.values.noiDung}
                                        onChange={formikUpdate.handleChange}
                                    />
                                </Form.Group>
                            </Row>
                            <Button type="submit">Sửa</Button>&nbsp;&nbsp;
                        </Form>
                    )
            }
        </>
    )
}

export default FormAdminReply