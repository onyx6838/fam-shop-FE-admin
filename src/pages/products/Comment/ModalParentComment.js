import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import FormAdminReply from './FormAdminReply'
import DanhGiaApi from '../../../api/DanhGiaApi'

const ModalParentComment = ({ isOpen, closeModal, selectedItem }) => {
    const [openFormAdminReply, setOpenFormAdminReply] = useState(false)
    const [adminIsReplyCmt, setAdminIsReplyCmt] = useState(false)

    const checkReplyCmt = async (maDanhGia) => {
        const data = await DanhGiaApi.checkReplyQuanTri(maDanhGia);
        setAdminIsReplyCmt(data)
    }

    return (
        <Modal show={isOpen}>
            <Modal.Header>
                <Modal.Title>Đánh giá cha</Modal.Title>
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body>
                        <Card.Title>{selectedItem.tenNguoiDanhGia}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">----------------</Card.Subtitle>
                        <Card.Text> {selectedItem.noiDung}</Card.Text>
                        <Card.Link href="#">Xóa?</Card.Link>
                        <Card.Link href="#" onClick={(e) => {
                            e.preventDefault()
                            setOpenFormAdminReply((state) => !state)
                            checkReplyCmt(selectedItem.maDanhGia)
                        }}>
                            Quản trị trả lời
                        </Card.Link>
                    </Card.Body>
                </Card>
                {
                    openFormAdminReply && <FormAdminReply selectedItem={selectedItem.sanPham} maDanhGiaCha={selectedItem.maDanhGia} adminIsReplyCmt={adminIsReplyCmt} closeForm={() => setOpenFormAdminReply(false)} />
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

export default ModalParentComment