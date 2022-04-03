import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import * as Icon from 'react-feather'

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../../redux/slice/brandSlice";

const Brand = () => {
  const dispatch = useDispatch();
  const size = useSelector(state => state.brand.size);
  const page = useSelector(state => state.brand.page);
  //const totalPages = useSelector(state => state.product.totalPages);
  const totalElements = useSelector(state => state.brand.totalElements);
  const brands = useSelector(state => state.brand.brands);

  useEffect(() => {
    dispatch(fetchBrands({ page: 1, size }))
  }, [dispatch, size])

  const tableColumnsProduct = [
    {
      dataField: "maThuongHieu",
      text: "Mã",
      sort: true
    },
    {
      dataField: "tenThuongHieu",
      text: "Tên Thương Hiệu",
      sort: true
    },
    {
      dataField: "hinhAnh",
      text: "Hình Ảnh",
      sort: true
    }
  ];

  const handleTableChange = (type, { page, sizePerPage }) => {
    dispatch(fetchBrands({ page, size: sizePerPage }))
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
          data={brands}
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
    <h1 className="h3 mb-3">Thương Hiệu</h1>
    <Brand />
  </Container>
);

export default Tables;