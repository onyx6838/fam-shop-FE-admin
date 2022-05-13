import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import * as Icon from 'react-feather'

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../../redux/slice/accountSlice";

const roleOptions = [
  {
    name: "QUAN_TRI",
    value: "success",
  },
  {
    name: "NGUOI_DUNG",
    value: "warning",
  },
  {
    name: "NHA_CUNG_CAP",
    value: "info",
  },
  {
    name: "SHIPPER",
    value: "secondary",
  }
];

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
        
      </div>
    );
  };

  const roleFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        
      </div>
    );
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
                      <Icon.PlusCircle size="24" className="align-middle mr-2"/>
                      <Icon.Trash2 size="24" className="align-middle mr-2" />
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