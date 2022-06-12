import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import * as Icon from 'react-feather'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { fetchChildComments } from '../../../redux/slice/commentSlice';
import './modalChildComment.css'

import DanhGiaApi from '../../../api/DanhGiaApi'
import reduxNotification from '../../../components/ReduxNotification';

const ModalChildComment = ({ isOpen, closeModal, selectedItem }) => {
    const dispatch = useDispatch();
    const size = useSelector(state => state.comment.childCmtSize);
    const page = useSelector(state => state.comment.childCmtPage);
    const totalElements = useSelector(state => state.comment.totalChildElements);
    const childComments = useSelector(state => state.comment.childComments);
    const [selectedChildCmt, setSelectedChildCmt] = useState({})

    useEffect(() => {
        dispatch(fetchChildComments({ page: 1, size, maDanhGiaCha: selectedItem.maDanhGia }))
    }, [dispatch, selectedItem.maDanhGia, size])

    const configPagination = {
        page: page,
        totalSize: totalElements,
        sizePerPage: size,
        nextPageText: '>',
        prePageText: '<',
        withFirstAndLast: false,
        alwaysShowAllBtns: true,
        hideSizePerPage: true
    };

    const childCmtFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <Icon.File size="24" className="align-middle mr-2" onClick={() => { setSelectedChildCmt(row) }} />
                {
                    row.trangThai === 'AN' && <Icon.Eye size="24" className="align-middle mr-2" onClick={() => { handleUnlockChildCmt(row) }} />
                }
                {
                    row.trangThai === 'CONG_BO' && <Icon.EyeOff size="24" className="align-middle mr-2" onClick={() => { handleLockChildCmt(row) }} />
                }
            </div>
        );
    };
    // công bố hoặc ẩn
    const tableColumnsComment = [
        {
            dataField: "maDanhGia",
            text: "Mã"
        },
        {
            dataField: "tenNguoiDanhGia",
            text: "Tác giả"
        },
        {
            dataField: "ngayTaoDanhGia",
            text: "Ngày tạo"
        },
        {
            dataField: "trangThai",
            text: "Trạng thái"
        },
        {
            dataField: "edit",
            text: "Edit",
            sort: false,
            formatter: childCmtFormatter,
            headerAttrs: { width: 140 }
        }
    ];

    const handleTableChange = (type, { page, sizePerPage }) => {
        dispatch(fetchChildComments({ page: page, size: sizePerPage, maDanhGiaCha: selectedItem.maDanhGia }))
    }

    const handleRemoveChildCmt = (e, maDanhGia) => {
        e.preventDefault();
        Swal.fire({
            title: 'Xóa bình luận ?',
            text: 'Thao tác bình luận',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                const response = DanhGiaApi.deleteChildCmt(maDanhGia)
                response.then((r) => {
                    reduxNotification.showSuccessNotification(
                        "Xóa bình luận",
                        "Xóa bình luận thành công !!");
                    dispatch(fetchChildComments({ page: page, size: size, maDanhGiaCha: selectedItem.maDanhGia }))
                }).catch((error) => {
                    console.log(error);
                    reduxNotification.showWrongNotification(
                        "Xóa bình luận",
                        "Xóa bình luận thất bại !!");
                })
            }
        })
    }

    const handleLockChildCmt = (row) => {
        const { maDanhGia } = row
        Swal.fire({
            title: 'Ẩn bình luận ?',
            text: 'Thao tác bình luận',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                const response = DanhGiaApi.lockChildCmt(maDanhGia)
                response.then((r) => {
                    reduxNotification.showSuccessNotification(
                        "Ẩn bình luận",
                        "Ẩn bình luận thành công !!");
                    dispatch(fetchChildComments({ page: page, size: size, maDanhGiaCha: selectedItem.maDanhGia }))
                }).catch((error) => {
                    console.log(error);
                    reduxNotification.showWrongNotification(
                        "Ẩn bình luận",
                        "Ẩn bình luận lỗi !!");
                })
            }
        })
    }

    const handleUnlockChildCmt = (row) => {
        const { maDanhGia } = row
        Swal.fire({
            title: 'Công bố bình luận ?',
            text: 'Thao tác bình luận',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                const response = DanhGiaApi.unlockChildCmt(maDanhGia)
                response.then((r) => {
                    reduxNotification.showSuccessNotification(
                        "Công bố bình luận",
                        "Công bố bình luận thành công !!");
                    dispatch(fetchChildComments({ page: page, size: size, maDanhGiaCha: selectedItem.maDanhGia }))
                }).catch((error) => {
                    console.log(error);
                    reduxNotification.showWrongNotification(
                        "Công bố bình luận",
                        "Công bố bình luận lỗi");
                })
            }
        })
    }

    return (
        <Modal show={isOpen} dialogClassName="my-modal">
            <Modal.Header>
                Danh sách cây đánh giá
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col lg={7}>
                        <ToolkitProvider
                            keyField="maDanhGia"
                            data={childComments}
                            columns={tableColumnsComment}
                            search
                        >
                            {toolkitprops => (
                                <>
                                    <Row style={{ alignItems: "flex-end" }}>
                                        <Col lg="9">
                                        </Col>
                                        <Col lg="3" style={{ paddingBottom: 20 }}>
                                            <div className="float-right pull-right">
                                            </div>
                                        </Col>
                                    </Row>
                                    <BootstrapTable
                                        {...toolkitprops.baseProps}
                                        bootstrap4
                                        striped
                                        hover
                                        bordered
                                        remote
                                        pagination={paginationFactory(configPagination)}
                                        onTableChange={handleTableChange}
                                    />
                                </>
                            )}
                        </ToolkitProvider>
                    </Col>
                    <Col lg={5}>
                        <h3>Xem bình luận</h3>
                        {
                            Object.keys(selectedChildCmt).length !== 0 && (
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{selectedChildCmt.tenNguoiDanhGia}</Card.Title>
                                        <Card.Text>{selectedChildCmt.noiDung}</Card.Text>
                                        <Card.Link href="#" onClick={(e) => handleRemoveChildCmt(e, selectedChildCmt.maDanhGia)}>Xóa</Card.Link>
                                    </Card.Body>
                                </Card>
                            )
                        }
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalChildComment