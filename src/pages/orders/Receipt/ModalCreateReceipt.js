import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalCreateReceipt = ({ isOpen, closeModal }) => {
    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header>
                <Modal.Title>Phiếu nhập kho</Modal.Title>
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={closeModal}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCreateReceipt