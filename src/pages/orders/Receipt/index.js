import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import * as Icon from 'react-feather'

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useDispatch, useSelector } from "react-redux";
import { fetchReceipts } from "../../../redux/slice/receiptSlice";
import ModalReceiptInfo from "./ModalReceiptInfo";
import ModalCreateReceipt from "./ModalCreateReceipt";

const Receipt = () => {
    const dispatch = useDispatch();
    const size = useSelector(state => state.receipt.size);
    const pageNumber = useSelector(state => state.receipt.page);
    const totalElements = useSelector(state => state.receipt.totalElements);
    const receipts = useSelector(state => state.receipt.receipts);
    const [openReceiptInfoModal, setOpenReceiptInfoModal] = useState(false)
    const [openCreateReceiptModal, setOpenCreateReceiptModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})

    useEffect(() => {
        dispatch(fetchReceipts({ page: 1, size }))
    }, [dispatch, size])

    const rankFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <Icon.Eye size="24" className="align-middle mr-2" onClick={() => {
                    setOpenReceiptInfoModal(true)
                    setSelectedItem(row)
                }} />
            </div>
        );
    };

    const tableColumnsReceipt = [
        {
            dataField: "maPNK",
            text: "Mã",
            headerAttrs: { width: 50 }
        },
        {
            dataField: "loaiPhieu",
            text: "Loại Phiếu"
        },
        {
            dataField: "tongTien",
            text: "Tổng Tiền"
        },
        {
            dataField: "thoiGian",
            text: "Thời gian"
        },
        {
            dataField: "edit",
            text: "Edit",
            formatter: rankFormatter,
            headerAttrs: { width: 160 }
        }
    ];

    const handleTableChange = (type, { page, sizePerPage }) => {
        dispatch(fetchReceipts({ page, size: sizePerPage }))
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
    return (
        <>
            <Card>
                <Card.Body>
                    <ToolkitProvider
                        keyField="maPNK"
                        data={receipts}
                        columns={tableColumnsReceipt}
                        search
                    >
                        {toolkitprops => (
                            <>
                                <Row style={{ alignItems: "flex-end" }}>
                                    <Col lg="9">
                                        
                                    </Col>
                                    <Col lg="3" style={{ paddingBottom: 20 }}>
                                        <div className="float-right pull-right">
                                            <Icon.PlusCircle size="24" className="align-middle mr-2" onClick={() => setOpenCreateReceiptModal(true)} />
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
                openReceiptInfoModal && <ModalReceiptInfo isOpen={openReceiptInfoModal} closeModal={() => setOpenReceiptInfoModal(false)} selectedItem={selectedItem} /> 
            }
            {
                openCreateReceiptModal && <ModalCreateReceipt isOpen={openCreateReceiptModal} closeModal={() => setOpenCreateReceiptModal(false)} />
            }
        </>
    );
};

const Tables = () => (
    <Container fluid className="p-0">
        <h1 className="h3 mb-3">Quản lý Phiếu nhập kho</h1>
        <Receipt />
    </Container>
);

export default Tables;