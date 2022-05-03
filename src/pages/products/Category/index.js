import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import * as Icon from 'react-feather'

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/slice/categorySlice";
import ModalCreate from "./ModalCreate";

const Category = () => {
  const dispatch = useDispatch();
  const size = useSelector(state => state.category.size);
  const page = useSelector(state => state.category.page);

  const totalElements = useSelector(state => state.category.totalElements);
  const categories = useSelector(state => state.category.categories);
  const [openCreateModal, setOpenCreateModal] = useState(false)

  useEffect(() => {
    dispatch(fetchCategories({ page: 1, size }))
  }, [dispatch, size])

  const tableColumnsCategory = [
    {
      dataField: "maLoai",
      text: "Mã Loại"
    },
    {
      dataField: "ten",
      text: "Tên"
    },
    {
      dataField: "moTa",
      text: "Mô Tả"
    }
  ];

  const handleTableChange = (type, { page, sizePerPage }) => {
    dispatch(fetchCategories({ page, size: sizePerPage }))
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
            keyField="maLoai"
            data={categories}
            columns={tableColumnsCategory}
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
      {
        openCreateModal && <ModalCreate isOpen={openCreateModal} closeModal={() => setOpenCreateModal(false)} refreshForm={refreshForm} />
      }
    </>
  );
};

const Tables = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Quản lý Loại Sản Phẩm</h1>
    <Category />
  </Container>
);

export default Tables;