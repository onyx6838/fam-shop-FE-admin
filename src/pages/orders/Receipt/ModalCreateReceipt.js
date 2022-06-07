import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeSelectedReceiptRows, fetchProducts } from '../../../redux/slice/productSlice'
import './modalCreateReceipt.css'
import * as Icon from 'react-feather'

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import Swal from 'sweetalert2'
import { Element } from 'react-scroll'

const ModalCreateReceipt = ({ isOpen, closeModal }) => {
    const dispatch = useDispatch();
    const size = useSelector(state => state.product.size);
    const page = useSelector(state => state.product.page);
    const totalElements = useSelector(state => state.product.totalElements);
    const products = useSelector(state => state.product.products);
    const selectedReceiptRows = useSelector(state => state.product.selectedReceiptRows);
    const [receiptProduct, setReceiptProduct] = useState([])

    useEffect(() => {
        dispatch(fetchProducts({ page: 1, size }))
    }, [dispatch, size])

    const onSubmitForm = async (values, { resetForm }) => {

    }

    const formik = useFormik({
        initialValues: {

        },
        onSubmit: onSubmitForm,
        validateOnChange: false,
        validateOnBlur: false
    });

    const imageFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <img src={row.hinhAnh} className="img-fluid" alt="img prd" />
            </div>
        )
    }

    const tableColumnsProduct = [
        {
            dataField: "maSP",
            text: "Mã",
            headerAttrs: { width: 50 }
        },
        {
            dataField: "ten",
            text: "Tên"
        },
        {
            dataField: "hinhAnh",
            text: "Ảnh",
            formatter: imageFormatter,
            headerAttrs: { width: 100 }
        }
    ]

    const handleTableChange = (type, { page, sizePerPage }) => {
        dispatch(fetchProducts({ page, size: sizePerPage }))
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

    const handleOnSelect = (row, isSelect) => {
        let selected = selectedReceiptRows;
        if (isSelect) {
            selected = [...selected, row.maSP]
        } else {
            selected = selected.filter(x => x !== row.maSP)
        }

        dispatch(changeSelectedReceiptRows(selected))
    }

    const handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(r => r.maSP);
        let selected = [];

        if (isSelect) {
            selected = ids;
        }

        dispatch(changeSelectedReceiptRows(selected))
    }

    const selectRowOption = {
        mode: 'checkbox',
        clickToSelect: true,
        selected: selectedReceiptRows,
        onSelect: handleOnSelect,
        onSelectAll: handleOnSelectAll
    }

    const importPrd = () => {
        Swal.fire({
            title: 'Đưa vào đơn nhập các sản phẩm đã chọn ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                const data = products.filter(item => selectedReceiptRows.includes(item.maSP)).map(x => ({
                    maSP: x.maSP,
                    ten: x.ten,
                    donGiaNhap: x.donGiaNhap,
                    hinhAnh: x.hinhAnh,
                    soLuong: 1,
                    tongTienMuc: x.donGiaNhap,
                    hanSuDung: ''
                }))
                setReceiptProduct(data)
            }
        })
    }

    const changeDataReceiptPrdSoLuong = (e, maSP) => {
        const products = [...receiptProduct]
        const selected = products.find(p => p.maSP === maSP)
        selected.soLuong = e.target.value
        selected.tongTienMuc = selected.soLuong * selected.donGiaNhap
        setReceiptProduct(products)
    }

    const changeDataReceiptPrdHSD = (e, maSP) => {
        const products = [...receiptProduct]
        const selected = products.find(p => p.maSP === maSP)
        selected.hanSuDung = e.target.value
        setReceiptProduct(products)
    }

    return (
        <Modal show={isOpen} dialogClassName="my-modal">
            <Modal.Header>
                <Modal.Title>Phiếu nhập kho</Modal.Title>
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col lg={6}>
                        <Form onSubmit={formik.handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Địa chỉ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="diaChi"
                                        value={formik.values.diaChi}
                                        onChange={formik.handleChange}
                                        isValid={formik.touched.diaChi && !formik.errors.diaChi}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Họ Tên</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="hoTen"
                                        value={formik.values.hoTen}
                                        onChange={formik.handleChange}
                                        isValid={formik.touched.hoTen && !formik.errors.hoTen}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Mật khẩu</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="matKhau"
                                        value={formik.values.matKhau}
                                        onChange={formik.handleChange}
                                        isValid={formik.touched.matKhau && !formik.errors.matKhau}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Button type="submit">Lưu</Button>
                        </Form>
                        <hr />
                        {
                            receiptProduct.length > 0 &&
                            (
                                <Element className="element" style={{
                                    position: 'relative',
                                    height: '440px',
                                    overflow: 'scroll',
                                    marginBottom: '20px'
                                }}>
                                    {
                                        receiptProduct.map(item => (
                                            <div className="card shadow-0 border mb-4" key={item.maSP}>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                            <img src={item.hinhAnh} className="img-fluid" alt="Receipt Order Line Item" />
                                                        </div>
                                                        <div className="col-md-5 text-center d-flex justify-content-center align-items-center">
                                                            <p className="text-muted mb-0">{item.ten}</p>
                                                        </div>
                                                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                            <input type="number" value={item.soLuong} min={1} name="soLuong" className="form-control col-lg-10" placeholder="Số lượng nhập"
                                                                onChange={(e) => changeDataReceiptPrdSoLuong(e, item.maSP)} />
                                                        </div>
                                                        <div className="col-md-3 text-center d-flex justify-content-center align-items-center">
                                                            <input type="date" value={item.hanSuDung} name="hanSuDung" className="form-control col-lg-10" placeholder="HSD"
                                                                onChange={(e) => changeDataReceiptPrdHSD(e, item.maSP)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </Element>
                            )
                        }
                    </Col>
                    <Col lg={6}>
                        <ToolkitProvider
                            keyField="maSP"
                            data={products}
                            columns={tableColumnsProduct}
                            search
                        >
                            {toolkitprops => (
                                <>
                                    <Row style={{ alignItems: "flex-end" }}>
                                        <Col lg="9">

                                        </Col>
                                        <Col lg="3" style={{ paddingBottom: 5 }}>
                                            <div className="float-right pull-right">
                                                <Icon.ArrowLeftCircle size="24" className="align-middle mr-2" onClick={() => importPrd()} />
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
                                        selectRow={selectRowOption}
                                    />
                                </>
                            )}
                        </ToolkitProvider>
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

export default ModalCreateReceipt