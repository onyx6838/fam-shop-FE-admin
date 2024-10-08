import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import * as Icon from 'react-feather'

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../../redux/slice/accountSlice";
import Swal from "sweetalert2";
import reduxNotification from "../../../components/ReduxNotification";

import TaiKhoanApi from '../../../api/TaiKhoanApi'
import ModalUpdateAccount from "./ModalUpdateAccount";
import withRoleComponent from "../../../HOC/withRoleComponent";
import ModalCreateAccount from "./ModalCreateAccount";

const roleOptions = [
  {
    name: "QUAN_TRI",
    style: "success",
    value: "QUẢN TRỊ"
  },
  {
    name: "NGUOI_DUNG",
    style: "warning",
    value: "NGƯỜI DÙNG"
  },
  {
    name: "NHA_CUNG_CAP",
    style: "info",
    value: "NHÀ CUNG CẤP"
  },
  {
    name: "NHAN_VIEN",
    style: "secondary",
    value: "NHÂN VIÊN"
  },
  {
    name: "SHIPPER",
    style: "secondary",
    value: "SHIPPER"
  }
];

const statusOptions = [
  {
    name: "ACTIVE",
    value: "success",
  },
  {
    name: "NOT_ACTIVE",
    value: "warning",
  }
]

const ButtonFnc = ({ openModal }) => <Icon.PlusCircle size="24" className="align-middle mr-2" onClick={openModal}></Icon.PlusCircle>

const ButtonProtect = withRoleComponent(ButtonFnc)

const Account = () => {
  const dispatch = useDispatch();
  const size = useSelector(state => state.account.size);
  const pageNumber = useSelector(state => state.account.page);
  const totalElements = useSelector(state => state.account.totalElements);
  const accounts = useSelector(state => state.account.accounts);
  const [selectedItem, setSelectedItem] = useState({})
  const [openModalUpdateAccount, setOpenModalUpdateAccount] = useState(false)
  const [openModalCreateAccount, setOpenModalCreateAccount] = useState(false)

  useEffect(() => {
    dispatch(fetchAccounts({ page: 1, size }))
  }, [dispatch, size])

  const rankFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        {
          row.trangThai === 'ACTIVE' && <Icon.Lock color="red" size="24" className="align-middle mr-2" onClick={() => lockAccount(row)} />
        }
        {
          row.trangThai === 'NOT_ACTIVE' && <Icon.Unlock color="green" size="24" className="align-middle mr-2" onClick={() => unlockAccount(row)} />
        }
        <Icon.Edit2 color="green" size="24" className="align-middle mr-2" onClick={() => {
          setSelectedItem(row)
          setOpenModalUpdateAccount(true)
        }} />
      </div>
    );
  };

  const statusFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <>
        {
          statusOptions.filter(color => row.trangThai === color.name).map((color, index) => (
            <span key={index} className={`p-2 badge badge-${color.name ? color.value : 'primary'}`}>{color.name}</span>
          ))
        }
      </>
    );
  };

  const roleFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <>
        {
          roleOptions.filter(color => row.loaiTK === color.name).map((color, index) => (
            <span key={index} className={`p-2 badge badge-${color.name ? color.style : 'primary'}`}>{color.value}</span>
          ))
        }
      </>
    );
  };

  const lockAccount = ({ maTK }) => {
    Swal.fire({
      title: 'Khóa tài khoản',
      text: 'Thao tác tài khoản?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        const response = TaiKhoanApi.lockAccount(maTK)
        response.then((r) => {
          reduxNotification.showSuccessNotification(
            "Thay đổi trạng thái tài khoản",
            "Thay đổi trạng thái tài khoản thành công!");
          refreshForm()
        }).catch((error) => {
          console.log(error);
          reduxNotification.showWrongNotification(
            "Thay đổi trạng thái tài khoản",
            "Thay đổi trạng thái tài khoản thất bại!");
        })
      }
    })
  }

  const unlockAccount = ({ maTK }) => {
    Swal.fire({
      title: 'Mở Khóa tài khoản',
      text: 'Thao tác tài khoản?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        const response = TaiKhoanApi.unlockAccount(maTK)
        response.then((r) => {
          reduxNotification.showSuccessNotification(
            "Thay đổi trạng thái tài khoản",
            "Thay đổi trạng thái tài khoản thành công!");
          refreshForm()
        }).catch((error) => {
          console.log(error);
          reduxNotification.showWrongNotification(
            "Thay đổi trạng thái tài khoản",
            "Thay đổi trạng thái tài khoản thất bại!");
        })
      }
    })
  }

  const tableColumnsAccounts = [
    {
      dataField: "maTK",
      text: "Mã",
      headerAttrs: { width: 50 }
    },
    {
      dataField: "tenTK",
      text: "Tên TK",
      headerAttrs: { width: 120 }
    },
    {
      dataField: "hoTen",
      text: "Họ Tên"
    },
    {
      dataField: "email",
      text: "Email"
    },
    {
      dataField: "loaiTK",
      text: "Loại TK",
      formatter: roleFormatter,
      headerAttrs: { width: 130 }
    },
    {
      dataField: "trangThai",
      text: "Trạng thái",
      formatter: statusFormatter,
      headerAttrs: { width: 135 }
    },
    {
      dataField: "edit",
      text: "Edit",
      sort: false,
      formatter: rankFormatter,
      headerAttrs: { width: 100 }
    }
  ];

  const handleTableChange = (type, { page, sizePerPage }) => {
    dispatch(fetchAccounts({ page, size: sizePerPage }))
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
            keyField="maTK"
            data={accounts}
            columns={tableColumnsAccounts}
            search
          >
            {toolkitprops => (
              <>
                <Row style={{ alignItems: "flex-end" }}>
                  <Col lg="9">

                  </Col>
                  <Col lg="3" style={{ paddingBottom: 20 }}>
                    <div className="float-right pull-right">
                      <ButtonProtect openModal={() => setOpenModalCreateAccount(true)} />
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
        openModalUpdateAccount && <ModalUpdateAccount isOpen={openModalUpdateAccount} closeModal={() => setOpenModalUpdateAccount(false)} selectedItem={selectedItem} refreshForm={refreshForm} />
      }
      {
        openModalCreateAccount && <ModalCreateAccount isOpen={openModalCreateAccount} closeModal={() => setOpenModalCreateAccount(false)} refreshForm={refreshForm} />
      }
    </>
  );
};

const Tables = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Quản Lý Tài Khoản</h1>
    <Account />
  </Container>
);

export default Tables