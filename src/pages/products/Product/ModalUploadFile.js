import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap'

import SanPhamApi from '../../../api/SanPhamApi'

const ModalUploadFile = ({ isOpen, closeModal, selectedItem }) => {
    const [file, setFile] = useState([])
    // fix = useEffect de anh? k bi lặp lại khi mở lên do formik cache
    useEffect(() => {
        if (selectedItem.maSP !== undefined) {
            const response = SanPhamApi.getById(selectedItem.maSP);
            response.then(rs => {
                const fileData = rs.sanPhamFiles.map((item) =>
                    fetch("data:application/octet-binary;base64," + item.data)
                        .then(res => res.arrayBuffer())
                        .then(buffer => {
                            return new File([new Uint8Array(buffer)], item.name, { type: item.mimetype })
                        }))
                Promise.all(fileData).then((results) => {
                    setFile(results)
                })
            })
        }
    }, [selectedItem.maSP])

    const handleChangeFile = (files) => {
        //let arr = file.filter((item) => !files.includes(item.name))
        //let newArr = [...arr, ...files]
        //setFile([])
        // let arr = file.map((item) => {
        // let newArr = files.map((item, i) => {
        //     return file.includes(item.name) ? { ...file[i], operation: "INSERT" } : null
        // })
        // })
        let newArr = [...file, ...files]
        let filtered = newArr.filter((tag, index, array) =>
            array.findIndex(t => t.name === tag.name) === index)
        let addStatus = filtered.map((item) => {
            if (!file.includes(item.name)) {
                return { ...item, operation: "INSERT" }
            } else if (!files.includes(item.name) && file.includes(item.name)) {
                return { ...item, operation: "REMOVE" }
            } else if (files.includes(item.name) && file.includes(item.name)) {
                return { ...item, operation: "NONE" }
            }
            return item;
        })
        console.log(files);
        console.log(file);
        console.log(filtered);
        console.log(addStatus);
    }

    const handleRemoveFile = (fileRemove) => {
        let arr = file.filter((item) => item.name !== fileRemove.name)
        setFile(arr)
    }

    return (
        <Modal show={isOpen} size='lg'>
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
                    onSubmit={async (values) => {
                        await SanPhamApi.uploadImage(values.files, selectedItem.maSP)
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
                                            handleChangeFile(myFiles)
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
                    {file && [...file].map((item, i) => (
                        <Col sm={6} key={i}>
                            <Card key={i}>
                                <Card.Header>
                                    <button type="button" className="close" aria-label="Close" onClick={() => handleRemoveFile(item)}>
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
            </ModalBody>
            <img src='https://firebasestorage.googleapis.com/v0/b/fam-shop-4fd26.appspot.com/o/53df1974-eb5e-42bf-96f0-2178b1f7c05e.png?alt=media'
            alt=''/>
        </Modal>
    )
}

export default ModalUploadFile