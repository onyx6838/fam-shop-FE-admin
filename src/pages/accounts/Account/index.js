import React, { useEffect } from "react";
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

// const roleOptions = [
//   {
//     name: "QUAN_TRI",
//     value: "success",
//   },
//   {
//     name: "NGUOI_DUNG",
//     value: "warning",
//   },
//   {
//     name: "NHA_CUNG_CAP",
//     value: "info",
//   },
//   {
//     name: "SHIPPER",
//     value: "secondary",
//   }
// ];

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

const Account = () => {
  const dispatch = useDispatch();
  const size = useSelector(state => state.account.size);
  const pageNumber = useSelector(state => state.account.page);
  const totalElements = useSelector(state => state.account.totalElements);
  const accounts = useSelector(state => state.account.accounts);

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
            "Change status Account",
            "Change status Account Successfully!");
          refreshForm()
        }).catch((error) => {
          console.log(error);
          reduxNotification.showWrongNotification(
            "Change status Account",
            "Change status Account Failed!");
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
            "Change status Account",
            "Change status Account Successfully!");
          refreshForm()
        }).catch((error) => {
          console.log(error);
          reduxNotification.showWrongNotification(
            "Change status Account",
            "Change status Account Failed!");
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
      text: "Tên TK"
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
      text: "Loại TK"
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
      headerAttrs: { width: 160 }
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
                      {/* <Icon.PlusCircle size="24" className="align-middle mr-2" />
                      <Icon.Trash2 size="24" className="align-middle mr-2" /> */}
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