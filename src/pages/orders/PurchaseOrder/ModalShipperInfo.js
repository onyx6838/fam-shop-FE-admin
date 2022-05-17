import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalShipInfo = ({ isOpen, closeModal, selectedItem }) => {
    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header>
                <Modal.Title>Thông tin shipper</Modal.Title>
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                {
                    selectedItem.nhanVien.hoTen
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalShipInfo