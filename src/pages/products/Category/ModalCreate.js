import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import reduxNotification from '../../../components/ReduxNotification';
import Select from "react-select";
import LoaiSanPhamApi from '../../../api/LoaiSanPhamApi'

const ModalCreate = ({ isOpen, closeModal, refreshForm }) => {
    const [childCategory, setChildCategory] = useState([])

    useEffect(() => {
        const fetchSelectData = async () => {
            let childCategoryResponse = await LoaiSanPhamApi.getAllLoaiSPIncludeChildAndParent();
            let arrChildCategory = childCategoryResponse.map(({ maLoai, ten }) => ({ value: maLoai, label: ten }))
            setChildCategory(arrChildCategory)
        }
        fetchSelectData()
    }, [])

    return (
        <Modal show={isOpen}>
            <Modal.Header>
                Thêm mới
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        ten: "",
                        moTa: "",
                        loaiSPCha: 0
                    }}
                    onSubmit={async (values) => {
                        try {
                            await LoaiSanPhamApi.createLSP(values);
                            closeModal()
                            reduxNotification.showSuccessNotification(
                                "Create Category",
                                "Create Category Successfully!");
                            refreshForm()
                        } catch (error) {
                            console.log(error);
                            reduxNotification.showWrongNotification(
                                "Error When Create Category",
                                "Create Category Failed!");
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
                                    <Form.Label>Tên</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="ten"
                                        value={values.ten}
                                        onChange={handleChange}
                                        isValid={touched.ten && !errors.ten}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Mô tả</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="moTa"
                                        value={values.moTa}
                                        onChange={handleChange}
                                        isValid={touched.moTa && !errors.moTa}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" className="mb-3">
                                    <Form.Label>Loại Sản Phẩm</Form.Label>
                                    <Select
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        options={childCategory}
                                        name="loaiSPCha"
                                        onChange={selectedOption => {
                                            setFieldValue("loaiSPCha", selectedOption.value);
                                        }}
                                    />
                                </Form.Group>
                            </Row>
                            <Button type="submit">Save</Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default ModalCreate