import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import * as Icon from 'react-feather'

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchaseOrders } from "../../../redux/slice/purchaseOrderSlice";
import ModalPurchaseOrderLine from "./ModalPurchaseOrderLine";

const paymentTypeColors = [
  {
    name: "TRUC_TIEP",
    value: "success",
  },
  {
    name: "CHUYEN_KHOAN",
    value: "warning",
  },
  {
    name: "NHAN_HANG",
    value: "danger",
  }
];

const statusOrderColors = [
  {
    name: "HOA_DON",
    value: "success",
  },
  {
    name: "DON_DAT",
    value: "warning",
  },
  {
    name: "VAN_DON",
    value: "danger",
  }
];

const paymentStatusColors = [
  {
    name: "DA_TT",
    value: "success",
  },
  {
    name: "CHUA_TT",
    value: "warning"
  }
]

const PurchaseOrder = () => {
  const dispatch = useDispatch();
  const size = useSelector(state => state.purchaseOrder.size);
  const page = useSelector(state => state.purchaseOrder.page);
  const totalElements = useSelector(state => state.purchaseOrder.totalElements);
  const purchaseOrders = useSelector(state => state.purchaseOrder.purchaseOrders);

  const [openPurchaseOrderLineModal, setOpenPurchaseOrderLineModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  useEffect(() => {
    dispatch(fetchPurchaseOrders({ page: 1, size }))
  }, [dispatch, size])

  const rankFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <Icon.Check size="24" className="align-middle mr-2" />
        <Icon.X size="24" className="align-middle mr-2" />
      </div>
    );
  };

  const orderPurchaseLineFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <Icon.Eye size="24" className="align-middle mr-2" onClick={() => {
          setOpenPurchaseOrderLineModal(true)
          setSelectedItem(row)
        }} />
      </div>
    );
  };

  const orderPurchasePaymentTypeFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <>
        {
          paymentTypeColors.filter(color => row.hinhThucTToan === color.name).map((color, index) => (
            <span key={index} className={`badge badge-${color.name ? color.value : 'primary'}`}>{row.hinhThucTToan}</span>
          ))
        }
      </>
    );
  };

  const orderPurchaseStatusFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <>
        {
          statusOrderColors.filter(color => row.trangThai === color.name).map((color, index) => (
            <span key={index} className={`badge badge-${color.name ? color.value : 'primary'}`}>{row.trangThai}</span>
          ))
        }
      </>
    );
  };

  const orderPurchasePaymentStatusFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <>
        {
          paymentStatusColors.filter(color => row.trangThaiTToan === color.name).map((color, index) => (
            <span key={index} className={`badge badge-${color.name ? color.value : 'primary'}`}>{row.trangThaiTToan}</span>
          ))
        }
      </>
    );
  };

  const tablePurchaseOrders = [
    {
      dataField: "maDonDat",
      text: "Mã Đơn",
      headerAttrs: { width: 80 }
    },
    {
      dataField: "thoiGianDat",
      text: "TGian Đặt"
    },
    {
      dataField: "thoiGianNhanHang",
      text: "TGian Nhận"
    },
    {
      dataField: "diaChi",
      text: "Địa chỉ"
    },
    {
      dataField: "sdtNhanHang",
      text: "SĐT nhận hàng"
    },
    {
      dataField: "tongTien",
      text: "Tổng tiền"
    },
    {
      dataField: "trangThai",
      text: "Trạng thái",
      formatter: orderPurchaseStatusFormatter,
      headerAttrs: { width: 90 }
    },
    {
      dataField: "trangThaiTToan",
      text: "T/thái thanh toán",
      formatter: orderPurchasePaymentStatusFormatter,
      headerAttrs: { width: 90 }
    },
    {
      dataField: "hinhThucTToan",
      text: "Hình thức thanh toán",
      formatter: orderPurchasePaymentTypeFormatter,
      headerAttrs: { width: 125 }
    },
    {
      dataField: "detail",
      text: "Chi tiết đơn",
      formatter: orderPurchaseLineFormatter,
      headerAttrs: { width: 70 }
    },
    {
      dataField: "edit",
      text: "Thao tác",
      formatter: rankFormatter,
      headerAttrs: { width: 90 }
    }
  ];

  const handleTableChange = (type, { page, sizePerPage }) => {
    dispatch(fetchPurchaseOrders({ page, size: sizePerPage }))
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
        {/* <Card.Header>
         <Card.Title tag="h5">Pagination</Card.Title>
        <h6 className="card-subtitle text-muted">
          Pagination Table
        </h6> 
      </Card.Header> */}
        <Card.Body>
          <ToolkitProvider
            keyField="maDonDat"
            data={purchaseOrders}
            columns={tablePurchaseOrders}
            search
          >
            {toolkitprops => (
              <>
                <Row style={{ alignItems: "flex-end" }}>
                  <Col lg="9">

                  </Col>
                  {/* <Col lg="3" style={{ paddingBottom: 20 }}>
                  <div className="float-right pull-right">
                    <Icon.PlusCircle size="24" className="align-middle mr-2" />
                  </div>
                </Col> */}
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
        openPurchaseOrderLineModal && <ModalPurchaseOrderLine isOpen={openPurchaseOrderLineModal} closeModal={() => setOpenPurchaseOrderLineModal(false)} selectedItem={selectedItem}/>
      }
    </>
  );
};

const Tables = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Quản lý Đơn đặt hàng</h1>
    <PurchaseOrder />
  </Container>
);

export default Tables;