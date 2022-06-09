import { Formik } from 'formik'
import React, { useState } from 'react'
import { Button, Card, Col, Form, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap'
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import ThuongHieuApi from '../../../api/ThuongHieuApi'
import reduxNotification from '../../../components/ReduxNotification';

const ModalCreate = ({ isOpen, closeModal, refreshForm }) => {
  const [file, setFile] = useState(null)
  // modal update sẽ thêm cache file
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
            file: {}
          }}
          onSubmit={async (values) => {
            try {
              await ThuongHieuApi.createThuongHieu({ file: file, tenThuongHieu: values.ten });
              closeModal()
              reduxNotification.showSuccessNotification(
                "Tạo thương hiệu",
                "Tạo thương hiệu thành công!");
              refreshForm()
            } catch (error) {
              console.log(error);
              reduxNotification.showWrongNotification(
                "Lỗi khi tạo thương hiệu",
                "Tạo thương hiệu lỗi!");
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
                  <Form.Label>Tên Thương Hiệu</Form.Label>
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
                  <Form.Label>Ảnh</Form.Label>
                  <br />
                  <input
                    name="file"
                    type="file"
                    onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0]);
                      setFile(event.currentTarget.files[0])
                    }}
                  />
                </Form.Group>
              </Row>
              <Button type="submit">Lưu</Button>
            </Form>
          )}
        </Formik>
        {
          file && (
            <Row className='m-3'>
              <Col lg={6}>
                <Card>
                  <Card.Header>
                    <Card.Title tag="h5" className="mb-0">
                      {file.name.split('.').slice(0, -1).join('.')}
                    </Card.Title>
                  </Card.Header>
                  <Card.Img src={URL.createObjectURL(file)} alt="Card image cap" />
                </Card>
              </Col>
            </Row>
          )
        }
      </ModalBody>
    </Modal>
  )
}

export default ModalCreate