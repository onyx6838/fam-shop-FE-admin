import { Field, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import Select from "react-select";
import SanPhamApi from '../../../api/SanPhamApi'
import LoaiSanPhamApi from '../../../api/LoaiSanPhamApi'
import ThuongHieuApi from '../../../api/ThuongHieuApi'
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import reduxNotification from '../../../components/ReduxNotification'

import * as Yup from 'yup';

const ModalCreate = ({ isOpen, closeModal, refreshForm }) => {
  const [parentSP, setParentSP] = useState([])
  const [childCategory, setChildCategory] = useState([])
  const [brand, setBrand] = useState([])

  const yupValid = Yup.object({
    ten: Yup.string()
      .required('Required')
      .max(50, 'Must be between 6 to 50 characters')
      .min(6, 'Must be between 6 to 50 characters')
  })

  useEffect(() => {
    const fetchSelectData = async () => {
      let response = await SanPhamApi.getAllParentSanPhams();
      let arr = response.content.map(({ maSP, ten }) => ({ value: maSP, label: ten }))
      setParentSP(arr)

      let childCategoryResponse = await LoaiSanPhamApi.getChildCategory();
      let arrChildCategory = childCategoryResponse.map(({ maLoai, ten }) => ({ value: maLoai, label: ten }))
      setChildCategory(arrChildCategory)

      let brandResponse = await ThuongHieuApi.getAllBrandWithoutPaging();
      let arrBrand = brandResponse.content.map(({ maThuongHieu, tenThuongHieu }) => ({ value: maThuongHieu, label: tenThuongHieu }))
      setBrand(arrBrand)
    }
    fetchSelectData()
  }, [])

  return (
    <Modal show={isOpen} size='lg'>
      <ModalHeader>
        Thêm mới
        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
          <span aria-hidden="true">×</span>
        </button>
      </ModalHeader>
      <ModalBody className="text-left m-3">
        <Formik
          initialValues={{
            ten: "",
            moTa: "",
            donGiaBan: 0,
            donGiaNhap: 0,
            parentSP: 0,
            childCategory: 0,
            brand: 0
          }}
          validationSchema={yupValid}
          onSubmit={async (values) => {
            try {
              await SanPhamApi.addSanPham(values);
              closeModal()
              reduxNotification.showSuccessNotification(
                "Create Product",
                "Create Product Successfully!");
              refreshForm()
            } catch (error) {
              console.log(error);
              reduxNotification.showWrongNotification(
                "Error When Create Product",
                "Create Product Failed!");
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
                  <Field name="moTa">
                    {({ field }) => <ReactQuill value={field.value} onChange={field.onChange(field.name)} />}
                  </Field>
                </Form.Group>
                <Form.Group as={Col} md="12">
                  <Form.Label>Đơn giá bán</Form.Label>
                  <Form.Control
                    type="number"
                    name="donGiaBan"
                    value={values.donGiaBan}
                    onChange={handleChange}
                    isValid={touched.donGiaBan && !errors.donGiaBan}
                    min="0"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12">
                  <Form.Label>Đơn giá nhập</Form.Label>
                  <Form.Control
                    type="number"
                    name="donGiaNhap"
                    value={values.donGiaNhap}
                    onChange={handleChange}
                    isValid={touched.donGiaNhap && !errors.donGiaNhap}
                    min="0"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" className="mb-3">
                  <Form.Label>Sản Phẩm Cha</Form.Label>
                  <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={parentSP}
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
                    name="brand"
                    onChange={selectedOption => {
                      setFieldValue("brand", selectedOption.value);
                    }}
                  />
                </Form.Group>
              </Row>
              <Button type="submit">Save</Button>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  )
}

export default ModalCreate