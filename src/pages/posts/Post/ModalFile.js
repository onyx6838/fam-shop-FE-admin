import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap'
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import BaiVietApi from '../../../api/BaiVietApi'
import reduxNotification from '../../../components/ReduxNotification';

const ModalFile = ({ isOpen, closeModal, selectedItem }) => {
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState('')
    const [initFile, setInitFile] = useState(selectedItem.anhDaiDien)

    useEffect(() => {
        setFileName(nameFileRegex(selectedItem))
    }, [selectedItem])

    const nameFileRegex = (selectedItem) => {
        let text = selectedItem.anhDaiDien
        if (selectedItem.anhDaiDien !== null) {
            let myRE = /(https:\/\/firebasestorage.googleapis.com\/v0\/b\/fam-shop-4fd26.appspot.com\/o\/post%2F)(.*)(\?.*)/g
            let fileUrls = [...text.matchAll(myRE)].map(r => r[2])
            return fileUrls
        }
        return ''
    }

    return (
        <Modal show={isOpen} size='md'>
            <ModalHeader>
                Hình Ảnh
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </ModalHeader>
            <ModalBody className="text-left m-3">
                <Formik
                    initialValues={{
                        file: file
                    }}
                    onSubmit={(values) => {
                        const response = BaiVietApi.uploadImage(values.file, selectedItem.maBaiViet)
                        response.then(async (rs) => {
                            const res = await BaiVietApi.getById(selectedItem.maBaiViet);
                            setInitFile(res.anhDaiDien)
                            setFile(null)
                            reduxNotification.showSuccessNotification(
                                "Ảnh đại diện bài viết",
                                "Thay đổi ảnh đại diện bài viết thành công !!");
                        }).catch((err) => {
                            console.log(err);
                            reduxNotification.showWrongNotification(
                                "Ảnh đại diện bài viết",
                                "Thay đổi ảnh đại diện bài viết lỗi !!");
                        })
                    }}
                >
                    {(formik) => (
                        <Form noValidate onSubmit={formik.handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12">
                                    <input
                                        name="file"
                                        type="file"
                                        onChange={(event) => {
                                            const fileData = event.target.files[0];
                                            setFile(fileData)
                                            formik.setFieldValue("file", fileData);
                                        }}
                                    />
                                </Form.Group>
                            </Row>
                            <Button type="submit">Change</Button>
                        </Form>
                    )}
                </Formik>
                <Row className='m-3'>
                    <Col xs={12} md={12}>
                        <h3>Ảnh tải lên</h3>
                    </Col>
                    {
                        file && (
                            <Col lg={12}>
                                <Card>
                                    <Card.Header>
                                        <Card.Title tag="h5" className="mb-0">
                                            {fileName.toString().split('.').slice(0, -1).join('.')}
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Img width="100%" src={URL.createObjectURL(file)} alt="Card image cap" />
                                </Card>
                            </Col>
                        )
                    }
                </Row>

                <Row className='m-3'>
                    <Col xs={12} md={12}>
                        <h3>Ảnh đang có</h3>
                    </Col>
                    <Col lg={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title tag="h5" className="mb-0">
                                    {fileName.toString().split('.').slice(0, -1).join('.')}
                                </Card.Title>
                            </Card.Header>
                            <Card.Img width="100%" src={`${initFile}`} alt="Card image cap" />
                        </Card>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    )
}

export default ModalFile