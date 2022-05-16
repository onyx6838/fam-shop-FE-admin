import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import * as Icon from 'react-feather'

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchaseOrders } from "../../../redux/slice/purchaseOrderSlice";
import ModalPurchaseOrderLine from "./ModalPurchaseOrderLine";
import Swal from "sweetalert2";

import DonDatHangApi from '../../../api/DonDatHangApi'
import reduxNotification from "../../../components/ReduxNotification";
import ModalCreatePurchaseOrder from "./ModalCreatePurchaseOrder";
import ModalShipperAssignment from "./ModalShipperAssignment";

const paymentTypeColors = [
  {
    ordinary: '1',
    name: "TRUC_TIEP",
    value: "success",
  },
  {
    ordinary: '0',
    name: "CHUYEN_KHOAN",
    value: "warning",
  },
  {
    ordinary: '2',
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
    value: "info",
  },
  {
    name: "HUY_DON",
    value: "secondary",
  }
];

const paymentStatusColors = [
  {
    ordinary: '1',
    name: "DA_TT",
    value: "success",
  },
  {
    ordinary: '0',
    name: "CHUA_TT",
    value: "info"
  }
]

const changeStatusOrderMessage = [
  {
    ordinary: '1',
    name: "HOA_DON",
    value: "Chuyển trạng thái đơn sang hóa đơn ?",
  },
  {
    ordinary: '0',
    name: "DON_DAT",
    value: "Đơn đặt"
  },
  {
    ordinary: '2',
    name: "VAN_DON",
    value: "Chuyển trạng thái đơn sang vận đơn ?",
  },
  {
    ordinary: '3',
    name: "HUY_DON",
    value: "Chuyển trạng thái sang hủy đơn ?",
  }
]

const PurchaseOrder = () => {
  const dispatch = useDispatch();
  const size = useSelector(state => state.purchaseOrder.size);
  const page = useSelector(state => state.purchaseOrder.page);
  const totalElements = useSelector(state => state.purchaseOrder.totalElements);
  const purchaseOrders = useSelector(state => state.purchaseOrder.purchaseOrders);

  const [openPurchaseOrderLineModal, setOpenPurchaseOrderLineModal] = useState(false)
  const [openCreatePurchaseOrderModal, setOpenCreatePurchaseOrderModal] = useState(false)
  const [openShipperAssignmentModal, setOpenShipperAssignmentModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  useEffect(() => {
    dispatch(fetchPurchaseOrders({ page: 1, size }))
  }, [dispatch, size])

  const changeStatusOrder = async (order, e) => {
    Swal.fire({
      title: `${changeStatusOrderMessage.filter(msg => msg.ordinary === e.target.value).map((item) => item.value)}`,
      text: 'Thay đổi trạng thái đơn hàng?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        const response = DonDatHangApi.changeStatusDonDat({
          id: order.maDonDat,
          orderStatus: parseInt(e.target.value),
          paymentType: parseInt(e.target.value) === 1 ? 1 : -1
        })
        response.then((r) => {
          reduxNotification.showSuccessNotification(
            "Change Order Status",
            "Change Order Status Successfully!");
          dispatch(fetchPurchaseOrders({ page: 1, size }))
        }).catch((error) => {
          console.log(error);
          reduxNotification.showWrongNotification(
            "Change Order Status",
            "Change Order Status Failed!");
        })
      }
    })
  }

  const rankFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <>
        {
          row.trangThai === 'HUY_DON' || row.trangThai === 'HOA_DON' ? <></> :
            (
              row.trangThai === 'DON_DAT' ? (
                <Form.Select className="mb-3" defaultValue={'0'} onChange={(e) => changeStatusOrder(row, e)}>
                  <option hidden>Thao tác</option>
                  <option value='2'>Xác nhận</option>
                  <option value='3'>Hủy đơn</option>
                </Form.Select>
              ) : (
                <Form.Select className="mb-3" defaultValue={'0'} onChange={(e) => changeStatusOrder(row, e)}>
                  <option hidden>Thao tác</option>
                  <option value='1'>Hoàn thành</option>
                </Form.Select>
              )
            )
        }
      </>
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
            <span key={index} className={`p-2 badge badge-${color.name ? color.value : 'primary'}`}>{row.hinhThucTToan}</span>
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
            <span key={index} className={`p-2 badge badge-${color.name ? color.value : 'primary'}`}>{row.trangThai}</span>
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
            <span key={index} className={`p-2 badge badge-${color.name ? color.value : 'primary'}`}>{row.trangThaiTToan}</span>
          ))
        }
      </>
    );
  };

  const shipperAssignmentFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <>
        {
          (row.trangThai === 'DON_DAT' || row.trangThai === 'VAN_DON') && <Icon.Truck size="24" className="align-middle mr-2" onClick={() => {
            setOpenShipperAssignmentModal(true)
            setSelectedItem(row)
          }}/>
        }
      </>
    );
  };

  const tablePurchaseOrders = [
    {
      dataField: "maDonDat",
      text: "Mã",
      headerAttrs: { width: 50 }
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
      headerAttrs: { width: 130 }
    },
    {
      dataField: "detail",
      text: "Chi tiết",
      formatter: orderPurchaseLineFormatter,
      headerAttrs: { width: 70 }
    },
    {
      dataField: "edit",
      text: "Thao tác",
      formatter: rankFormatter,
      headerAttrs: { width: 120 }
    },
    {
      dataField: "shipper",
      text: "Phân công ship",
      formatter: shipperAssignmentFormatter,
      headerAttrs: { width: 120 }
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
        </Card.Body>
      </Card>
      {
        openPurchaseOrderLineModal && <ModalPurchaseOrderLine isOpen={openPurchaseOrderLineModal} closeModal={() => setOpenPurchaseOrderLineModal(false)} selectedItem={selectedItem} />
      }
      {
        openCreatePurchaseOrderModal && <ModalCreatePurchaseOrder isOpen={openCreatePurchaseOrderModal} closeModal={() => setOpenCreatePurchaseOrderModal(false)} />
      }
      {
        openShipperAssignmentModal && <ModalShipperAssignment isOpen={openShipperAssignmentModal} closeModal={() => setOpenShipperAssignmentModal(false)} selectedItem={selectedItem} />
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