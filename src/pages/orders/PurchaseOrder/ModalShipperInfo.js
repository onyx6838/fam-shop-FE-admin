import React from 'react'
import { Button, Modal, Table } from 'react-bootstrap'

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
                <Table>
                    <tbody>
                        <tr>
                            <td><b>Họ tên:</b></td>
                            <td>{selectedItem.nhanVien.hoTen}</td>
                        </tr>
                        <tr>
                            <td><b>SĐT:</b></td>
                            <td>{selectedItem.nhanVien.sdt}</td>
                        </tr>
                        <tr>
                            <td><b>Email:</b></td>
                            <td>{selectedItem.nhanVien.email}</td>
                        </tr>
                    </tbody>
                </Table>
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