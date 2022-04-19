import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalPurchaseOrderLine = ({ isOpen, closeModal }) => {
    return (
        <Modal show={isOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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

export default ModalPurchaseOrderLine