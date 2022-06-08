import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap'
import Select from "react-select";

import LoaiSanPhamApi from '../../../api/LoaiSanPhamApi'
import reduxNotification from '../../../components/ReduxNotification';

const ModalUpdate = ({ isOpen, closeModal, selectedItem, refreshForm }) => {
    const [parentCategory, setParentCategory] = useState([])
    const [parentCategoryId, setParentCategoryId] = useState(0)

    useEffect(() => {
        const fetchSelectData = async () => {
            let response = await LoaiSanPhamApi.getAllParentLSPIncludeAll();
            let arrTest =
                response.content.filter((item) => item.maLoai !== selectedItem.maLoai).map(({ maLoai, ten }) => ({ value: maLoai, label: ten }))
            console.log(arrTest);
            setParentCategory(arrTest)
        }
        fetchSelectData()
    }, [selectedItem.maLoai])

    const defaultValue = (options, value) => {
        return options ? options.find(option => option.value === value) : "";
    };

    return (
        <Modal show={isOpen} size='lg'>
            <ModalHeader>
                Sửa
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </ModalHeader>
            <ModalBody className="text-left m-3">
                <Formik
                    initialValues={{
                        ten: selectedItem.ten,
                        moTa: selectedItem.moTa ? selectedItem.moTa : "",
                        parentCategory: (selectedItem.loaiSPCha !== null ? selectedItem.loaiSPCha.maLoai : 0)
                    }}
                    onSubmit={async (values) => {
                        // try {
                        //     await SanPhamApi.updateSP(values, selectedItem.maSP);
                        //     closeModal()
                        //     reduxNotification.showSuccessNotification(
                        //         "Update Product",
                        //         "Update Product Successfully!");
                        //     refreshForm();
                        // } catch (error) {
                        //     console.log(error);
                        //     reduxNotification.showWrongNotification(
                        //         "Error When Update Product",
                        //         "Update Product Failed!");
                        // }
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
                                    <Form.Label>Mô Tả</Form.Label>
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
                                        options={parentCategory}
                                        value={defaultValue(parentCategory, values.parentCategory)}
                                        name="parentCategory"
                                        onChange={selectedOption => {
                                            setFieldValue("parentCategory", selectedOption.value);
                                        }}
                                    />
                                </Form.Group>
                            </Row>
                            <Button type="submit">Thay đổi</Button>
                        </Form>
                    )}
                </Formik>
            </ModalBody>
        </Modal>
    )
}

export default ModalUpdate