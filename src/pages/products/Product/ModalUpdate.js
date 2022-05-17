import { Field, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import Select from "react-select";

import SanPhamApi from '../../../api/SanPhamApi'
import LoaiSanPhamApi from '../../../api/LoaiSanPhamApi'
import ThuongHieuApi from '../../../api/ThuongHieuApi'
import reduxNotification from '../../../components/ReduxNotification';

const ModalUpdate = ({ isOpen, closeModal, selectedItem, refreshForm }) => {
    const [parentSP, setParentSP] = useState([])
    const [childCategory, setChildCategory] = useState([])
    const [brand, setBrand] = useState([])

    useEffect(() => {
        const fetchSelectData = async () => {
            let response = await SanPhamApi.getAllParentSanPhams();
            let arrTest = 
            response.content.filter((item) => item.maSP !== selectedItem.maSP).map(({ maSP, ten }) => ({ value: maSP, label: ten }))
            setParentSP(arrTest)

            let childCategoryResponse = await LoaiSanPhamApi.getChildCategory();
            let arrChildCategory = childCategoryResponse.map(({ maLoai, ten }) => ({ value: maLoai, label: ten }))
            setChildCategory(arrChildCategory)

            let brandResponse = await ThuongHieuApi.getAllBrandWithoutPaging();
            let arrBrand = brandResponse.content.map(({ maThuongHieu, tenThuongHieu }) => ({ value: maThuongHieu, label: tenThuongHieu }))
            setBrand(arrBrand)
        }
        fetchSelectData()
    }, [selectedItem.maSP])

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
                        moTa: selectedItem.moTa,
                        donGiaBan: selectedItem.donGiaBan,
                        donGiaNhap: selectedItem.donGiaNhap,
                        soLuong: selectedItem.soLuong,
                        parentSP: (selectedItem.spCha !== null ? selectedItem.spCha.maSP : 0),
                        childCategory: selectedItem.loaiSanPham.maLoai,
                        brand: selectedItem.thuongHieu.maThuongHieu
                    }}
                    onSubmit={async (values) => {
                        // setTimeout(() => {
                        //     alert(JSON.stringify(values, null, 2));
                        // }, 400);
                        try {
                            await SanPhamApi.updateSP(values, selectedItem.maSP);
                            closeModal()
                            reduxNotification.showSuccessNotification(
                              "Update Product",
                              "Update Product Successfully!");
                            refreshForm();
                          } catch (error) {
                            console.log(error);
                            reduxNotification.showWrongNotification(
                              "Error When Update Product",
                              "Update Product Failed!");
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
                                <Form.Group as={Col} md="12" controlId="validationFormik01">
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
                                <Form.Group as={Col} md="12" controlId="validationFormik02">
                                    <Form.Label>Mô tả</Form.Label>
                                    <Field name="moTa">
                                        {({ field }) => <ReactQuill value={field.value} onChange={field.onChange(field.name)} />}
                                    </Field>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationFormik01">
                                    <Form.Label>Đơn giá bán</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="donGiaBan"
                                        value={values.donGiaBan}
                                        onChange={handleChange}
                                        isValid={touched.donGiaBan && !errors.donGiaBan}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationFormik01">
                                    <Form.Label>Đơn giá nhập</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="donGiaNhap"
                                        value={values.donGiaNhap}
                                        onChange={handleChange}
                                        isValid={touched.donGiaNhap && !errors.donGiaNhap}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationFormik01">
                                    <Form.Label>Số lượng</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="soLuong"
                                        value={values.soLuong}
                                        onChange={handleChange}
                                        isValid={touched.soLuong && !errors.soLuong}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" className="mb-3">
                                    <Form.Label>Sản Phẩm Cha</Form.Label>
                                    <Select
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        options={parentSP}
                                        value={defaultValue(parentSP, values.parentSP)}
                                        name="parentSP"
                                        onChange={selectedOption => {
                                            setFieldValue("parentSP", selectedOption.value);
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="12" className="mb-3">
                                    <Form.Label>Loại Sản Phẩm</Form.Label>
                                    <Select
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        options={childCategory}
                                        value={defaultValue(childCategory, values.childCategory)}
                                        name="childCategory"
                                        onChange={selectedOption => {
                                            setFieldValue("childCategory", selectedOption.value);
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="12" className="mb-3">
                                    <Form.Label>Thương Hiệu</Form.Label>
                                    <Select
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        options={brand}
                                        value={defaultValue(brand, values.brand)}
                                        name="brand"
                                        onChange={selectedOption => {
                                            setFieldValue("brand", selectedOption.value);
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