import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import * as Icon from 'react-feather'

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/slice/productSlice";

const Product = () => {
  const dispatch = useDispatch();
  const size = useSelector(state => state.product.size);
  const page = useSelector(state => state.product.page);
  //const totalPages = useSelector(state => state.product.totalPages);
  const totalElements = useSelector(state => state.product.totalElements);
  const products = useSelector(state => state.product.products);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, size }))
  }, [dispatch, size])

  const tableColumnsProduct = [
    {
      dataField: "maSP",
      text: "Mã SP",
      sort: true
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
      sort: true
    },
    {
      dataField: "donGiaBan",
      text: "Đơn Giá Bán",
      sort: true
    },
    {
      dataField: "donGiaNhap",
      text: "Đơn Giá Nhập",
      sort: true
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

  return (
    <Card>
      <Card.Header>
        <Card.Title tag="h5">Pagination</Card.Title>
        {/* <h6 className="card-subtitle text-muted">
          Pagination Table
        </h6> */}
      </Card.Header>
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
                    <Icon.PlusCircle size="24" className="align-middle mr-2" />
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
  );
};

const Tables = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Đặc Trưng</h1>
    <Product />
  </Container>
);

export default Tables;