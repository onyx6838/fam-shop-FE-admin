import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap'

import SanPhamApi from '../../../api/SanPhamApi'
import reduxNotification from '../../../components/ReduxNotification'
import './modalUploadFile.css'

const ModalUploadFileTest = ({ isOpen, closeModal, selectedItem, refreshForm }) => {
    const [file, setFile] = useState([])
    const [fileUploaded, setFileUploaded] = useState([])
    const [openDeletePopup, setOpenDeletePopup] = useState(false)
    const [itemDelete, setItemDelete] = useState({})
    // fix = useEffect de anh? k bi lặp lại khi mở lên do formik cache
    useEffect(() => {
        if (selectedItem.maSP !== undefined) {
            const response = SanPhamApi.getById(selectedItem.maSP);
            response.then(rs => {
                setFileUploaded(rs.sanPhamFiles)
            })
        }
    }, [selectedItem.maSP])

    const handleChangeLocalFile = (files) => {
        let arr = file.filter((item) => !files.includes(item.name))
        let newArr = [...arr, ...files]
        setFile(newArr)
    }

    const handleRemoveLocalFile = (fileRemove) => {
        let arr = file.filter((item) => item.name !== fileRemove.name)
        setFile(arr)
    }

    const handleRemoveFile = async (fileRemove) => {
        const { name, token } = fileRemove;

        await SanPhamApi.deleteFileInDatabaseAndFireBase(name, token);
        const rs = await SanPhamApi.getById(selectedItem.maSP);
        setFileUploaded(rs.sanPhamFiles)
        setOpenDeletePopup(false)
    }

    const handleOpenDeletePopup = (item) => {
        setItemDelete(item)
        setOpenDeletePopup(true)
    }

    const closeDeletePopup = () => { setOpenDeletePopup(false); }

    const ModalDeleteFile = ({ isOpen, itemToDelete }) => (
        <Modal show={isOpen} className={"modal-colored modal-danger"} centered>
            <Modal.Header>
                <Modal.Title>Confirm</Modal.Title>
                <button type="button" className="close" aria-label="Close" onClick={closeDeletePopup}>
                    <span aria-hidden="true">×</span>
                </button>
            </Modal.Header>

            <Modal.Body>
                <p>You want delete this picture ??</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeDeletePopup}>Close</Button>
                <Button variant="primary" onClick={() => handleRemoveFile(itemToDelete)}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <Modal show={isOpen} size='lg' dialogClassName="my-modal">
            <ModalHeader>
                Quản lý ảnh
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </ModalHeader>
            <ModalBody className="text-left m-3">
                <Formik
                    initialValues={{
                        files: file,
                    }}
                    onSubmit={(values) => {
                        const response = SanPhamApi.uploadImage(values.files, selectedItem.maSP)
                        response.then(async (rs) => {
                            const data = await SanPhamApi.getById(selectedItem.maSP);
                            setFileUploaded(data.sanPhamFiles)
                            setFile([])
                            closeModal()
                            reduxNotification.showSuccessNotification(
                                "Thay đổi ảnh",
                                "Thay đổi ảnh thành công!");
                            refreshForm()
                        }).catch((err) => {
                            console.log(err);
                            reduxNotification.showWrongNotification(
                                "Thay đổi ảnh",
                                "Thay đổi ảnh lỗi!");
                        })
                    }}
                >
                    {(formik) => (
                        <Form noValidate onSubmit={formik.handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12">
                                    <input
                                        name="files"
                                        type="file"
                                        multiple
                                        onChange={(event) => {
                                            const filesData = event.target.files;
                                            let myFiles = Array.from(filesData);
                                            handleChangeLocalFile(myFiles)
                                            formik.setFieldValue("files", myFiles);
                                        }}
                                    />
                                </Form.Group>
                            </Row>
                            <Button type="submit">Upload</Button>
                        </Form>
                    )}
                </Formik>
                <Row className='m-3'>
                    <Col xs={12} md={12}>
                        <h3>Ảnh tải lên</h3>
                    </Col>
                    {file && [...file].map((item, i) => (
                        <Col sm={2} key={i}>
                            <Card key={i}>
                                <Card.Header>
                                    <button type="button" className="close" aria-label="Close" onClick={() => handleRemoveLocalFile(item)}>
                                        <span aria-hidden="true">×</span>
                                    </button>
                                    <Card.Title tag="h5" className="mb-0">
                                        {item.name.split('.').slice(0, -1).join('.')}
                                    </Card.Title>
                                </Card.Header>
                                <Card.Img width="100%" src={URL.createObjectURL(item)} alt="Card image cap" />
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row className='m-3'>
                    <Col xs={12} md={12}>
                        <h3>Ảnh đang có</h3>
                    </Col>
                    {fileUploaded && [...fileUploaded].map((item, i) => (
                        <Col sm={2} key={i}>
                            <Card key={i}>
                                <Card.Header>
                                    <button type="button" className="close" aria-label="Close" onClick={() => handleOpenDeletePopup(item)}>
                                        <span aria-hidden="true">×</span>
                                    </button>
                                    <Card.Title tag="h5" className="mb-0">
                                        {item.name.split('.').slice(0, -1).join('.')}
                                    </Card.Title>
                                </Card.Header>
                                <Card.Img width="100%" src={`https://firebasestorage.googleapis.com/v0/b/fam-shop-4fd26.appspot.com/o/product%2F${item.name}?alt=media&token=${item.token}`} alt="Card image cap" />
                            </Card>
                        </Col>
                    ))}
                </Row>
                <ModalDeleteFile isOpen={openDeletePopup} itemToDelete={itemDelete} />
            </ModalBody>
        </Modal>
    )
}

export default ModalUploadFileTest