import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import * as Icon from 'react-feather'

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsCate } from "../../../redux/slice/postCateSlice";
import ModalCreate from "./ModalCreate";
import ModalUpdate from "./ModalUpdate";

const PostCate = () => {
    const dispatch = useDispatch();
    const size = useSelector(state => state.postCate.size);
    const pageNumber = useSelector(state => state.postCate.page);
    const totalElements = useSelector(state => state.postCate.totalElements);
    const postCates = useSelector(state => state.postCate.postCates);

    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})

    useEffect(() => {
        dispatch(fetchPostsCate({ page: 1, size }))
    }, [dispatch, size])

    const rankFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <Icon.Edit size="24" className="align-middle mr-2" onClick={() => {
                    setSelectedItem(row)
                    setOpenUpdateModal(true)
                }} />
            </div>
        );
    };

    const tableColumns = [
        {
            dataField: "maTheLoaiBaiViet",
            text: "Mã",
            headerAttrs: { width: 50 }
        },
        {
            dataField: "tenTheLoaiBaiViet",
            text: "Tên"
        },
        {
            dataField: "duongDan",
            text: "Đường Dẫn"
        },
        {
            dataField: "edit",
            text: "Edit",
            sort: false,
            formatter: rankFormatter,
            headerAttrs: { width: 60 }
        }
    ];

    const handleTableChange = (type, { page, sizePerPage }) => {
        dispatch(fetchPostsCate({ page, size: sizePerPage }))
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
                        keyField="maTheLoaiBaiViet"
                        data={postCates}
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
        </>
    );
};

const Tables = () => (
    <Container fluid className="p-0">
        <h1 className="h3 mb-3">Quản Lý Thể Loại Bài Viết</h1>
        <PostCate />
    </Container>
);

export default Tables;