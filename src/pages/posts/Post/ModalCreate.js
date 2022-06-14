import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap'
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import TheLoaiBaiVietApi from '../../../api/TheLoaiBaiVietApi'
import BaiVietApi from '../../../api/BaiVietApi'
import reduxNotification from '../../../components/ReduxNotification';
import Select from "react-select";
import { useSelector } from 'react-redux';

const ModalCreate = ({ isOpen, closeModal, refreshForm }) => {
    const [cate, setCate] = useState([])
    const userInfo = useSelector(state => state.user.userInfo)

    useEffect(() => {
        const fetchSelectData = async () => {
            let response = await TheLoaiBaiVietApi.getAllWithoutPage();
            let arr = response.map(({ maTheLoaiBaiViet, tenTheLoaiBaiViet }) => ({ value: maTheLoaiBaiViet, label: tenTheLoaiBaiViet }))
            setCate(arr)
        }
        fetchSelectData()
    }, [])

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
                        tieuDe: "",
                        moTaNgan: "",
                        maTheLoai: 0
                    }}
                    onSubmit={async (values) => {
                        try {
                            await BaiVietApi.createShortBaiViet({ ...values, userNameCreator: userInfo.tenTK });
                            closeModal()
                            reduxNotification.showSuccessNotification(
                                "Tạo bài viết",
                                "Tạo bài viết thành công!");
                            refreshForm()
                        } catch (error) {
                            console.log(error);
                            reduxNotification.showWrongNotification(
                                "Lỗi khi tạo bài viết",
                                "Tạo bài viết lỗi!");
                        }
                    }}>
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        errors,
                        setFieldValue
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Tiêu Đề</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="tieuDe"
                                        value={values.tieuDe}
                                        onChange={handleChange}
                                        isValid={touched.tieuDe && !errors.tieuDe}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Mô Tả Ngắn</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="moTaNgan"
                                        value={values.moTaNgan}
                                        onChange={handleChange}
                                        isValid={touched.moTaNgan && !errors.moTaNgan}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" className="mb-3">
                                    <Form.Label>Thể Loại</Form.Label>
                                    <Select
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        options={cate}
                                        name="maTheLoai"
                                        onChange={selectedOption => {
                                            setFieldValue("maTheLoai", selectedOption.value);
                                        }}
                                    />
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