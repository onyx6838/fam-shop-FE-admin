import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import reduxNotification from "../../../components/ReduxNotification";

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

import { useDispatch, useSelector } from 'react-redux'
import { changeSelectedRowShipper, fetchAccountByRole } from '../../../redux/slice/accountSlice'

import Swal from "sweetalert2";

import DonDatHangApi from '../../../api/DonDatHangApi'

const ModalShipperAssignment = ({ isOpen, closeModal, selectedItem }) => {
    const dispatch = useDispatch();
    const shippers = useSelector(state => state.account.accounts)
    const size = useSelector(state => state.account.size);
    const pageNumber = useSelector(state => state.account.page);
    const totalElements = useSelector(state => state.account.totalElements);
    const selectedRowShipper = useSelector(state => state.account.selectedRowShipper);

    useEffect(() => {
        dispatch(fetchAccountByRole({ page: 1, size, role: 'SHIPPER' }))
    }, [dispatch, size])

    const tableColumnsReceipt = [
        {
            dataField: "maTK",
            text: "Mã",
            headerAttrs: { width: 50 }
        },
        {
            dataField: "hoTen",
            text: "Họ Tên"
        },
        {
            dataField: "sdt",
            text: "SĐT"
        }
    ];

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

    const handleTableChange = (type, { page, sizePerPage }) => {
        dispatch(fetchAccountByRole({ page, size: sizePerPage, role: 'SHIPPER' }))
    }

    const handleOnSelect = (row) => {
        dispatch(changeSelectedRowShipper(Array.of(row.maTK)))
    }

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        selected: selectedRowShipper,
        onSelect: handleOnSelect
    };

    const confirmShipper = () => {
        Swal.fire({
            title: `${selectedItem.trangThai === 'VAN_DON' ? 'Thay đổi sang shipper khác ?' : 'Giao cho shipper giao hàng ?'}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                const response = DonDatHangApi.changeShipperDonDat({
                    "ma-shipper": selectedRowShipper[0],
                    maDonDat: selectedItem.maDonDat
                })
                response.then((r) => {
                    closeModal()
                    dispatch(changeSelectedRowShipper([]))
                    reduxNotification.showSuccessNotification(
                        "Change Shipper",
                        "Change Shipper Successfully!");
                }).catch((error) => {
                    console.log(error);
                    reduxNotification.showWrongNotification(
                        "Change Shipper",
                        "Change Shipper Failed!");
                })
            }
        })
    }

    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header>
                <Modal.Title>Phân công Shipper cho đơn hàng ({selectedItem.nhanVien === null && "Chưa phân công shipper"})</Modal.Title>
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <ToolkitProvider
                    keyField="maTK"
                    data={shippers}
                    columns={tableColumnsReceipt}
                    search
                >
                    {toolkitprops => (
                        <>
                            <BootstrapTable
                                {...toolkitprops.baseProps}
                                bootstrap4
                                striped
                                hover
                                bordered
                                remote
                                pagination={paginationFactory(configPagination)}
                                onTableChange={handleTableChange}
                                selectRow={selectRow}
                            />
                        </>
                    )}
                </ToolkitProvider>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={confirmShipper}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalShipperAssignment