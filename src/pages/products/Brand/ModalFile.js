import React, { useEffect, useState } from 'react'
import { Card, Col, Modal, ModalBody, ModalHeader } from 'react-bootstrap'
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

const ModalFile = ({ isOpen, closeModal, selectedItem }) => {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    setFileName(nameFileRegex(selectedItem))
  }, [selectedItem])

  const nameFileRegex = (selectedItem) => {
    let text = selectedItem.hinhAnh
    if (selectedItem.hinhAnh !== null) {
      let myRE = /(https:\/\/firebasestorage.googleapis.com\/v0\/b\/fam-shop-4fd26.appspot.com\/o\/)(.*)(\?.*)/g
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
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title tag="h5" className="mb-0">
                {fileName.toString().split('.').slice(0, -1).join('.')}
              </Card.Title>
            </Card.Header>
            <Card.Img width="100%" src={`${selectedItem.hinhAnh}`} alt="Card image cap" />
          </Card>
        </Col>
      </ModalBody>
    </Modal>
  )
}

export default ModalFile