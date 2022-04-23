import { Formik } from 'formik'
import React, { useEffect } from 'react'
import { Button, Col, Form, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap'
import SanPhamApi from '../../../api/SanPhamApi'
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import reduxNotification from '../../../components/ReduxNotification'

const ModalFile = ({ isOpen, closeModal, refreshForm }) => {
  useEffect(() => {

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
            files: null
          }}
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
              </Row>
              <Button type="submit">Save</Button>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  )
}

export default ModalFile