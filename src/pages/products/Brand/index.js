import React, { useEffect } from "react";
import { Card, Col, Container, Form, Pagination, Row, Table } from "react-bootstrap";
import * as Icon from 'react-feather'

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../../redux/slice/brandSlice";

import { useTable, usePagination } from "react-table";

const Brand = () => {
  const dispatch = useDispatch();
  const size = useSelector(state => state.brand.size);
  const pageNumber = useSelector(state => state.brand.page);
  const totalPages = useSelector(state => state.product.totalPages);
  const totalElements = useSelector(state => state.brand.totalElements);
  const brands = useSelector(state => state.brand.brands);
  const brandTest = React.useMemo(() => [...brands], [brands])
  const tableColumnsV2 = [
    {
      Header: "Mã",
      accessor: "maThuongHieu",
    },
    {
      Header: "Tên Thương Hiệu",
      accessor: "tenThuongHieu",
    },
    {
      Header: "Hình Ảnh",
      accessor: "hinhAnh",
    }
  ];
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns: tableColumnsV2,
      data: brands,
      initialState: { pageIndex: 1 },
      manualPagination: true,
      pageCount: totalPages
    },
    usePagination
  );

  useEffect(() => {
    dispatch(fetchBrands({ page: pageIndex, size }))
  }, [dispatch, pageIndex, size])

  

  const tableColumnTest = React.useMemo(() => [
    {
      Header: "Mã",
      accessor: "maThuongHieu",
    },
    {
      Header: "Tên Thương Hiệu",
      accessor: "tenThuongHieu",
    },
    {
      Header: "Hình Ảnh",
      accessor: "hinhAnh",
    }
  ], [])




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

  // const handleTableChange = (type, { page, sizePerPage }) => {
  //   dispatch(fetchBrands({ page, size: sizePerPage }))
  // }

  // const configPagination = {
  //   page: pageNumber,
  //   totalSize: totalElements,
  //   sizePerPage: size,
  //   nextPageText: '>',
  //   prePageText: '<',
  //   withFirstAndLast: false,
  //   alwaysShowAllBtns: true,
  //   hideSizePerPage: true
  // };

  return (
    <Card>
      <Card.Header>
        <Card.Title tag="h5">Pagination</Card.Title>
        {/* <h6 className="card-subtitle text-muted">
          Pagination Table
        </h6> */}
      </Card.Header>
      <Card.Body>
        {/* <ToolkitProvider
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
        </ToolkitProvider> */}

        <Table striped bordered {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Row>
          <Col md="6">
            <Pagination className="float-end">
              <Pagination.First
                onClick={() => gotoPage(1)}
                disabled={!canPreviousPage}
              />
              <Pagination.Prev
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              />
              <Pagination.Next
                onClick={() => nextPage()}
                disabled={!canNextPage}
              />
              <Pagination.Last
                onClick={() => gotoPage(pageCount)}
                disabled={!canNextPage}
              />
            </Pagination>
          </Col>
        </Row>

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