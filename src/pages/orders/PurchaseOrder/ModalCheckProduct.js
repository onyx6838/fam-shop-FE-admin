import React, { useEffect } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { fetchChildReceiptsByMaSP } from '../../../redux/slice/receiptSlice';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

const ModalCheckProduct = ({ isOpen, closeModal, selectedProductId }) => {
    const dispatch = useDispatch();
    const size = useSelector(state => state.receipt.childSize);
    const page = useSelector(state => state.receipt.childPage);
    const totalElements = useSelector(state => state.receipt.childTotalElements);
    const childReceipts = useSelector(state => state.receipt.childReceipts);

    useEffect(() => {
        dispatch(fetchChildReceiptsByMaSP({ maSP: selectedProductId, page: 1, size }))
    }, [dispatch, selectedProductId, size])

    const tableProductCheck = [
        {
            dataField: "maCTPNK",
            text: "Mã PNK"
        },
        {
            dataField: "soLuong",
            text: "Số lượng"
        },
        {
            dataField: "hanSuDung",
            text: "Hạn SDụng"
        }
    ];

    const handleTableChange = (type, { page, sizePerPage }) => {
        dispatch(fetchChildReceiptsByMaSP({ maSP: selectedProductId, page: page, size: sizePerPage }))
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
        <Modal show={isOpen} centered className='border border-dark modal-warning'>
            <Modal.Header>
                <Modal.Title>Check kho</Modal.Title>
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <ToolkitProvider
                    keyField="maDonDat"
                    data={childReceipts}
                    columns={tableProductCheck}
                    search
                >
                    {toolkitprops => (
                        <>
                            <Row style={{ alignItems: "flex-end" }}>
                                <Col lg="9">

                                </Col>
                                <Col lg="3" style={{ paddingBottom: 20 }}>
                                    <div className="float-right pull-right">
                                        {/* <Icon.PlusCircle size="24" className="align-middle mr-2" onClick={() => setOpenCreatePurchaseOrderModal(true)} /> */}
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCheckProduct