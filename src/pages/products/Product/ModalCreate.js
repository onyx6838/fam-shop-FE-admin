import { Field, Formik } from 'formik'
import React from 'react'
import { Button, Col, Form, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap'
import ReactQuill from 'react-quill'

const ModalCreate = ({ isOpen , closeModal}) => {
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
            ten: "",
            moTa: "",
            donGiaBan: 0,
            donGiaNhap: 0
          }}
          onSubmit={(values) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
            }, 400);
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
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationFormik01">
                  <Form.Label>Tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="ten"
                    value={values.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
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
              </Row>
              <Button type="submit">Submit form</Button>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  )
}

export default ModalCreate