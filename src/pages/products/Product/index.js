import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import SanPhamApi from '../../../api/SanPhamApi'

import * as Icon from 'react-feather'

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

import ModalCreate from "./ModalCreate";
//import ModalUploadFile from "./ModalUploadFile";
import ModalUploadFileTest from "./ModalUploadFileTest";
import ModalUpdate from "./ModalUpdate";
import reduxNotification from '../../../components/ReduxNotification'

import { useDispatch, useSelector } from "react-redux";
import { changeSelectedRow, changeSelectedRows, fetchProducts } from "../../../redux/slice/productSlice";

const Product = () => {
  const dispatch = useDispatch();
  const size = useSelector(state => state.product.size);
  const page = useSelector(state => state.product.page);
  //const totalPages = useSelector(state => state.product.totalPages);
  const totalElements = useSelector(state => state.product.totalElements);
  const products = useSelector(state => state.product.products);
  const selectedRows = useSelector(state => state.product.selectedRows);
  const selectedRow = useSelector(state => state.product.selectedRow);

  const [selectedItem, setSelectedItem] = useState({})

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openUploadFileModal, setOpenUploadFileModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, size }))
  }, [dispatch, size])

  const rankFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <Icon.Edit size="24" className="align-middle mr-2" onClick={() => {
          setOpenUpdateModal(true)
          setSelectedItem(row)
        }} />
        <Icon.Trash2 size="24" className="align-middle mr-2" onClick={() => {
          dispatch(changeSelectedRow(row.maSP))
          deleteSpecProduct()
        }} />
        <Icon.Eye size="24" className="align-middle mr-2" />
        <Icon.Image size="24" className="align-middle mr-2" onClick={() => {
          setOpenUploadFileModal(true)
          setSelectedItem(row)
        }} />
      </div>
    );
  };

  const tableColumnsProduct = [
    {
      dataField: "maSP",
      text: "Mã",
      sort: true,
      headerAttrs: { width: 70 }
    },
    {
      dataField: "ten",
      text: "Tên",
      sort: true
    },
    {
      dataField: "moTa",
      text: "Mô Tả",
      sort: true
    },
    {
      dataField: "soLuong",
      text: "Số Lượng",
      sort: true,
      headerAttrs: { width: 120 }
    },
    {
      dataField: "donGiaBan",
      text: "Đơn Giá Bán",
      sort: true,
      headerAttrs: { width: 120 }
    },
    {
      dataField: "donGiaNhap",
      text: "Đơn Giá Nhập",
      sort: true,
      headerAttrs: { width: 120 }
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

  const deleteProduct = async (row) => {
    if (selectedRows === null || selectedRows === undefined || selectedRows.length === 0) {
      reduxNotification.showWrongNotification(
        "Xóa sản phẩm",
        "Bạn chưa chọn sản phẩm nào !"
      );
    } else {
      await SanPhamApi.deleteByMaSPs(selectedRows);
      // show notification
      reduxNotification.showSuccessNotification(
        "Xóa sản phẩm",
        "Xóa sản phẩm thành công !!");
      // reload group page
      refreshForm();  // loại tick sau khi xóa
    }
  }

  // option cho toast view
  const confirmDeleteOptions = {
    enableNote: true,
    requiredNote: true,
    notePlaceholder: 'John',
    noteLabel: 'What is your name?',
    onOk: ({ note }) => console.log(note),
    onCancel: ({ note }) => console.log(note),
  };

  const deleteSpecProduct = () => {
    reduxNotification.showConfirmDeleteNotification("Delete this Product ??", confirmDeleteOptions);
  }

  const refreshForm = () => {
    handleTableChange(null, {
      page: 1,
      sizePerPage: size
    })
    dispatch(changeSelectedRows([]))
  }

  const handleOnSelect = (row, isSelect) => {
    let selected = selectedRows;
    if (isSelect) {
      selected = [...selected, row.maSP]
    } else {
      selected = selected.filter(x => x !== row.maSP)
    }

    dispatch(changeSelectedRows(selected))
  }

  const handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r.maSP);
    let selected = [];

    if (isSelect) {
      selected = ids;
    }

    dispatch(changeSelectedRows(selected))
  }

  const selectRowOption = {
    mode: 'checkbox',
    clickToSelect: true,
    selected: selectedRows,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll
  }

  return (
    <>
      <Card>
        {/* <Card.Header>
          <Card.Title tag="h5">Sản Phẩm</Card.Title>
          <h6 className="card-subtitle text-muted">
          Pagination Table
        </h6>
        </Card.Header> */}
        <Card.Body>
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
                  <Col lg="3" style={{ paddingBottom: 20 }}>
                    <div className="float-right pull-right">
                      <Icon.PlusCircle size="24" className="align-middle mr-2" onClick={() => setOpenCreateModal(true)} />
                      <Icon.Trash2 size="24" className="align-middle mr-2" onClick={deleteProduct} />
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
                  selectRow={selectRowOption}
                  onTableChange={handleTableChange}
                />
              </>
            )}
          </ToolkitProvider>
        </Card.Body>
      </Card>
      <ModalCreate isOpen={openCreateModal} closeModal={() => setOpenCreateModal(false)} refreshForm={refreshForm} />
      {
        openUpdateModal && <ModalUpdate isOpen={openUpdateModal} closeModal={() => setOpenUpdateModal(false)} selectedItem={selectedItem} refreshForm={refreshForm} />
      }
      <ModalUploadFileTest selectedItem={selectedItem} isOpen={openUploadFileModal} closeModal={() => setOpenUploadFileModal(false)} refreshForm={refreshForm} />
    </>
  );
};

const Tables = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Quản lý sản phẩm</h1>
    <Product />
  </Container>
);

export default Tables;