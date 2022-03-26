import React from "react";
import { Card, Container } from "react-bootstrap";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import { tableData, tableColumns } from "./data.js";

const PaginationTable = () => {
  return (
    <Card>
      <Card.Header>
        <Card.Title tag="h5">Pagination</Card.Title>
        <h6 className="card-subtitle text-muted">
          Pagination by react-bootstrap-table2
        </h6>
      </Card.Header>
      <Card.Body>
        <BootstrapTable
          keyField="id"
          data={tableData}
          columns={tableColumns}
          bootstrap4
          bordered={false}
          pagination={paginationFactory({
            sizePerPage: 3
          })}
        />
      </Card.Body>
    </Card>
  );
};

const Tables = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Pagination</h1>
    <PaginationTable />
  </Container>
);

export default Tables;
