import { Formik } from 'formik';
import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import DacTrungApi from '../../../api/DacTrungApi'
import reduxNotification from '../../../components/ReduxNotification';

const FormCreateFeature = ({ loaiDacTrung, refreshForm, closeForm }) => {
    return (
        <Formik
            initialValues={{
                ten: "",
                moTa: "",
                giaTri: "",
                donVi: ""
            }}
            onSubmit={async (values) => {
                try {
                    await DacTrungApi.addDacTrung({ ...values, loaiDacTrung });
                    closeForm()
                    reduxNotification.showSuccessNotification(
                        "Create Feature In Group Features",
                        "Create Feature Successfully!");
                    refreshForm()
                } catch (error) {
                    console.log(error);
                    reduxNotification.showWrongNotification(
                        "Error When Create Feature",
                        "Create Feature Failed!");
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
                    <Button type="submit">Save</Button>
                </Form>
            )}
        </Formik>
    )
}

export default FormCreateFeature