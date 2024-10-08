import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import * as Icon from 'react-feather'

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../redux/slice/postSlice";
import ModalCreate from "./ModalCreate";
import ModalUpdate from "./ModalUpdate";
import ModalFile from "./ModalFile";
import ModalDescription from "./ModalDescription";

const Post = () => {
    const dispatch = useDispatch();
    const size = useSelector(state => state.post.size);
    const pageNumber = useSelector(state => state.post.page);
    const totalElements = useSelector(state => state.post.totalElements);
    const posts = useSelector(state => state.post.posts);

    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [openFileModal, setOpenFileModal] = useState(false)
    const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState({})

    useEffect(() => {
        dispatch(fetchPosts({ page: 1, size }))
    }, [dispatch, size])

    const rankFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <Icon.Edit size="24" className="align-middle mr-2" onClick={() => {
                    setSelectedItem(row)
                    setOpenUpdateModal(true)
                }} />
                <Icon.Image size="24" className="align-middle mr-2" onClick={() => {
                    setSelectedItem(row)
                    setOpenFileModal(true)
                }} />
                <Icon.FileText size="24" className="align-middle mr-2" onClick={() => {
                    setSelectedItem(row)
                    setOpenDescriptionModal(true)
                }} />
            </div>
        );
    };

    const tableColumns = [
        {
            dataField: "maBaiViet",
            text: "Mã",
            headerAttrs: { width: 50 }
        },
        {
            dataField: "tieuDe",
            text: "Tiêu Đề"
        },
        {
            dataField: "moTaNgan",
            text: "Mô Tả Ngắn"
        },
        {
            dataField: "edit",
            text: "Edit",
            sort: false,
            formatter: rankFormatter,
            headerAttrs: { width: 160 }
        }
    ];

    const handleTableChange = (type, { page, sizePerPage }) => {
        dispatch(fetchPosts({ page, size: sizePerPage }))
    }

    const configPagination = {
        page: pageNumber,
        totalSize: totalElements,
        sizePerPage: size,
        nextPageText: '>',
        prePageText: '<',
        withFirstAndLast: false,
        alwaysShowAllBtns: true,
        hideSizePerPage: true
    };

    const refreshForm = () => {
        handleTableChange(null, {
            page: 1,
            sizePerPage: size
        })
    }

    return (
        <>

            <Card>
                <Card.Body>
                    <ToolkitProvider
                        keyField="maBaiViet"
                        data={posts}
                        columns={tableColumns}
                        search
                    >
                        {toolkitprops => (
                            <>
                                <Row style={{ alignItems: "flex-end" }}>
                                    <Col lg="9">

                                    </Col>
                                    <Col lg="3" style={{ paddingBottom: 20 }}>
                                        <div className="float-right pull-right">
                                            <Icon.PlusCircle size="24" className="align-middle mr-2" onClick={() => setOpenCreateModal(true)} />
                                            {/* <Icon.Trash2 size="24" className="align-middle mr-2" /> */}
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
                openCreateModal && <ModalCreate isOpen={openCreateModal} closeModal={() => setOpenCreateModal(false)} refreshForm={refreshForm} />
            }
            {
                openUpdateModal && <ModalUpdate isOpen={openUpdateModal} closeModal={() => setOpenUpdateModal(false)} selectedItem={selectedItem} refreshForm={refreshForm} />
            }
            {
                openFileModal && <ModalFile isOpen={openFileModal} closeModal={() => setOpenFileModal(false)} selectedItem={selectedItem} />
            }
            {
                openDescriptionModal && <ModalDescription selectedItem={selectedItem} isOpen={openDescriptionModal} closeModal={() => setOpenDescriptionModal(false)} refreshForm={refreshForm} />
            }
        </>
    );
};

const Tables = () => (
    <Container fluid className="p-0">
        <h1 className="h3 mb-3">Quản Lý Bài Viết</h1>
        <Post />
    </Container>
);

export default Tables;