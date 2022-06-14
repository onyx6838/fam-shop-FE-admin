import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap'
import reduxNotification from '../../../components/ReduxNotification'
import TheLoaiBaiVietApi from '../../../api/TheLoaiBaiVietApi'
import BaiVietApi from '../../../api/BaiVietApi'
import Select from "react-select";

const ModalUpdate = ({ isOpen, closeModal, refreshForm, selectedItem }) => {
    const [cate, setCate] = useState([])

    useEffect(() => {
        const fetchSelectData = async () => {
            let response = await TheLoaiBaiVietApi.getAllWithoutPage();
            let arr = response.map(({ maTheLoaiBaiViet, tenTheLoaiBaiViet }) => ({ value: maTheLoaiBaiViet, label: tenTheLoaiBaiViet }))
            setCate(arr)
        }
        fetchSelectData()
    }, [])

    const submitForm = async (values, { resetForm }) => {
        try {
            await BaiVietApi.updateBV(selectedItem.maBaiViet, values);
            closeModal()
            reduxNotification.showSuccessNotification(
                "Cập nhật Bài viết",
                "Cập nhật Bài viết thành công!");
            refreshForm();
        } catch (error) {
            console.log(error);
            reduxNotification.showWrongNotification(
                "Lỗi khi cập nhật Bài viết",
                "Cập nhật Bài viết lỗi!");
        }
    }

    const formik = useFormik({
        initialValues: {
            tieuDe: selectedItem.tieuDe,
            moTaNgan: selectedItem.moTaNgan,
            maTheLoai: selectedItem.theLoaiBaiViet.maTheLoaiBaiViet
        },
        onSubmit: submitForm,
        validateOnBlur: false,
        validateOnChange: false
    });

    const defaultValue = (options, value) => {
        return options ? options.find(option => option.value === value) : "";
    };

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
                            <Form.Label>Tiêu Đề</Form.Label>
                            <Form.Control
                                type="text"
                                name="tieuDe"
                                value={formik.values.tieuDe}
                                onChange={formik.handleChange}
                                isValid={formik.touched.tieuDe && !formik.errors.tieuDe}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="12">
                            <Form.Label>Mô Tả Ngắn</Form.Label>
                            <Form.Control
                                type="text"
                                name="moTaNgan"
                                value={formik.values.moTaNgan}
                                onChange={formik.handleChange}
                                isValid={formik.touched.moTaNgan && !formik.errors.moTaNgan}
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
                                value={defaultValue(cate, formik.values.maTheLoai)}
                                onChange={selectedOption => {
                                    formik.setFieldValue("maTheLoai", selectedOption.value);
                                }}
                            />
                        </Form.Group>
                    </Row>
                    <Button type="submit">Cập nhật</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default ModalUpdate