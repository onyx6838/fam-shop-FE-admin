import { Formik } from 'formik';
import React from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import DacTrungApi from '../../../api/DacTrungApi'
import reduxNotification from '../../../components/ReduxNotification';
import validator from '../../../utils/YupValidator';

const ModalCreateGroupFeature = ({ isOpen, closeModal, refreshForm }) => {
    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header>
                <Modal.Title>Đặc trưng đại diện</Modal.Title>
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        ten: "",
                        moTa: "",
                        giaTri: "",
                        donVi: "",
                        loaiDacTrung: ""
                    }}
                    validationSchema={validator.FeatureSchema}
                    onSubmit={async (values) => {
                        try {
                            // tạm thời bỏ qua validate style loaiDacTrung
                            await DacTrungApi.addDacTrung(values);
                            closeModal()
                            reduxNotification.showSuccessNotification(
                                "Create Master Feature",
                                "Create Master Feature Successfully!");
                            refreshForm()
                        } catch (error) {
                            console.log(error);
                            reduxNotification.showWrongNotification(
                                "Error When Create Master Feature",
                                "Create Master Feature Failed!");
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
                                    <Form.Label>Loại Đặc Trưng</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="loaiDacTrung"
                                        value={values.loaiDacTrung}
                                        onChange={handleChange}
                                        isValid={touched.loaiDacTrung && !errors.loaiDacTrung}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    {errors.loaiDacTrung && touched.loaiDacTrung ? <span className='col-lg-12 text-danger'>{errors.loaiDacTrung}</span> : null}
                                </Form.Group>
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
                                    {errors.ten && touched.ten ? <span className='col-lg-12 text-danger'>{errors.ten}</span> : null}
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
                                    {errors.moTa && touched.moTa ? <span className='col-lg-12 text-danger'>{errors.moTa}</span> : null}
                                </Form.Group>
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Giá trị</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="giaTri"
                                        value={values.giaTri}
                                        onChange={handleChange}
                                        isValid={touched.giaTri && !errors.giaTri}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Đơn vị</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="donVi"
                                        value={values.donVi}
                                        onChange={handleChange}
                                        isValid={touched.donVi && !errors.donVi}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Button type="submit">Lưu</Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCreateGroupFeature