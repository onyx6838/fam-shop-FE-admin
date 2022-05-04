import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import SanPhamApi from '../../../api/SanPhamApi'

import * as Icon from 'react-feather'

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

import ModalCreate from "./ModalCreate";
import ModalUploadFileTest from "./ModalUploadFileTest";
import ModalUpdate from "./ModalUpdate";
import reduxNotification from '../../../components/ReduxNotification'

import { useDispatch, useSelector } from "react-redux";
import { changeSelectedRow, changeSelectedRows, fetchProducts } from "../../../redux/slice/productSlice";
import Swal from "sweetalert2";

const statusProductColors = [
  {
    ordinary: 1,
    name: "KICH_HOAT",
    value: "success",
  },
  {
    ordinary: 0,
    name: "CHUA_KICH_HOAT",
    value: "danger"
  }
];

const Product = () => {
  const dispatch = useDispatch();
  const size = useSelector(state => state.product.size);
  const page = useSelector(state => state.product.page);
  const totalElements = useSelector(state => state.product.totalElements);
  const products = useSelector(state => state.product.products);
  const selectedRows = useSelector(state => state.product.selectedRows);


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
        {
          row.trangThai !== 0 && <Icon.Lock size="24" className="align-middle mr-2" onClick={() => {
            dispatch(changeSelectedRow(row.maSP))
            deleteSpecProduct(row)
          }} />
        }
        {
          row.trangThai === 0 && <Icon.Unlock size="24" className="align-middle mr-2" onClick={() => reactiveSpecProduct(row)} />
        }
        <Icon.FileText size="24" className="align-middle mr-2" />
        <Icon.Image size="24" className="align-middle mr-2" onClick={() => {
          setOpenUploadFileModal(true)
          setSelectedItem(row)
        }} />
      </div>
    );
  };

  const productStatusFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <>
        {
          statusProductColors.filter(color => row.trangThai === color.ordinary).map((color, index) => (
            <span key={index} className={`p-2 badge badge-${color.name ? color.value : 'primary'}`}>{color.name}</span>
          ))
        }
      </>
    );
  };

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
      dataField: "moTa",
      text: "Mô Tả"
    },
    {
      dataField: "soLuong",
      text: "Số Lượng",
      headerAttrs: { width: 100 }
    },
    {
      dataField: "donGiaBan",
      text: "Đơn Giá Bán",
      headerAttrs: { width: 120 }
    },
    {
      dataField: "donGiaNhap",
      text: "Đơn Giá Nhập",
      headerAttrs: { width: 120 }
    },
    {
      dataField: "trangThai",
      text: "Trạng thái",
      formatter: productStatusFormatter,
      headerAttrs: { width: 140 }
    },
    {
      dataField: "edit",
      text: "Edit",
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
        "Xóa nhiều sản phẩm",
        "Bạn chưa chọn sản phẩm nào !"
      );
    } else {
      Swal.fire({
        title: 'Xóa nhiều sản phẩm',
        text: 'Thao tác sản phẩm?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await SanPhamApi.deleteByMaSPs(selectedRows);
            // show notification
            reduxNotification.showSuccessNotification(
              "Xóa nhiều sản phẩm",
              "Xóa nhiều sản phẩm thành công !!");
            // reload group page
            refreshForm();  // loại tick sau khi xóa 
          }
          catch (err) {
            console.log(err);
            reduxNotification.showWrongNotification(
              "Change Product",
              "Remove Product Failed!");
          }
        }
      })
    }
  }

  const deleteSpecProduct = ({ maSP }) => {
    Swal.fire({
      title: 'Xóa sản phẩm',
      text: 'Thao tác sản phẩm?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        const response = SanPhamApi.deleteByMaSP(maSP)
        response.then((r) => {
          reduxNotification.showSuccessNotification(
            "Change Product",
            "Remove Product Successfully!");
          refreshForm()
        }).catch((error) => {
          console.log(error);
          reduxNotification.showWrongNotification(
            "Change Product",
            "Remove Product Failed!");
        })
      }
    })
  }

  const reactiveSpecProduct = ({ maSP }) => {
    Swal.fire({
      title: 'Thay đổi trang thái sản phẩm',
      text: 'Thao tác sản phẩm?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        const response = SanPhamApi.reactiveSP(maSP)
        response.then((r) => {
          reduxNotification.showSuccessNotification(
            "Change Product",
            "Change Status Product Successfully!");
          refreshForm()
        }).catch((error) => {
          console.log(error);
          reduxNotification.showWrongNotification(
            "Change Product",
            "Change Status Failed !");
        })
      }
    })
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
      {
        openUploadFileModal && <ModalUploadFileTest selectedItem={selectedItem} isOpen={openUploadFileModal} closeModal={() => setOpenUploadFileModal(false)} refreshForm={refreshForm} />
      }
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