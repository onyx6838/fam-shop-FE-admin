import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import * as Icon from 'react-feather';
import { useDispatch, useSelector } from "react-redux";
import { fetchParentComments } from "../../../redux/slice/commentSlice";
import ModalChildComment from './ModalChildComment';
import ModalParentComment from "./ModalParentComment";




const Comment = () => {
    const dispatch = useDispatch();
    const size = useSelector(state => state.comment.size);
    const page = useSelector(state => state.comment.page);
    const totalElements = useSelector(state => state.comment.totalElements);
    const comments = useSelector(state => state.comment.comments);

    const [selectedItem, setSelectedItem] = useState({})
    const [openChildCommentModal, setOpenChildCommentModal] = useState(false)
    const [openParentCommentModal, setOpenParentCommentModal] = useState(false)

    useEffect(() => {
        dispatch(fetchParentComments({ page: 1, size }))
    }, [dispatch, size])

    const parentCmtFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <Icon.List size="24" className="align-middle mr-2" onClick={() => {
                    setOpenChildCommentModal(true)
                    setSelectedItem(row)
                }} />
                <Icon.Eye size="24" className="align-middle mr-2" onClick={() => {
                    setSelectedItem(row)
                    setOpenParentCommentModal(true)
                }} />
            </div>
        );
    };

    const tableColumnsComment = [
        {
            dataField: "maDanhGia",
            text: "Mã"
        },
        {
            dataField: "noiDung",
            text: "Nội dung"
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
            formatter: parentCmtFormatter,
            headerAttrs: { width: 140 }
        }
    ];

    const handleTableChange = (type, { page, sizePerPage }) => {
        dispatch(fetchParentComments({ page, size: sizePerPage }))
    }

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

    return (
        <>
            <Card>
                <Card.Body>
                    <ToolkitProvider
                        keyField="maDanhGia"
                        data={comments}
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
                </Card.Body>
            </Card>
            {
                openChildCommentModal && <ModalChildComment isOpen={openChildCommentModal}
                    closeModal={() => setOpenChildCommentModal(false)} selectedItem={selectedItem} />
            }
            {
                openParentCommentModal && <ModalParentComment isOpen={openParentCommentModal}
                    closeModal={() => setOpenParentCommentModal(false)} selectedItem={selectedItem} />
            }
        </>
    );
};

const Tables = () => (
    <Container fluid className="p-0">
        <h1 className="h3 mb-3">Quản lý Đánh giá sản phẩm</h1>
        <Comment />
    </Container>
);

export default Tables;