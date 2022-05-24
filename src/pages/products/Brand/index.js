import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import * as Icon from 'react-feather'

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../../redux/slice/brandSlice";
import ModalCreate from "./ModalCreate";
import ModalFile from "./ModalFile";

const Brand = () => {
  const dispatch = useDispatch();
  const size = useSelector(state => state.brand.size);
  const pageNumber = useSelector(state => state.brand.page);
  const totalElements = useSelector(state => state.brand.totalElements);
  const brands = useSelector(state => state.brand.brands);

  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openFileModal, setOpenFileModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  useEffect(() => {
    dispatch(fetchBrands({ page: 1, size }))
  }, [dispatch, size])

  const rankFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <Icon.Image size="24" className="align-middle mr-2" onClick={() => {
          setSelectedItem(row)
          setOpenFileModal(true)
        }} />
      </div>
    );
  };

  const tableColumnsProduct = [
    {
      dataField: "maThuongHieu",
      text: "Mã",
      headerAttrs: { width: 50 }
    },
    {
      dataField: "tenThuongHieu",
      text: "Tên Thương Hiệu"
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
    dispatch(fetchBrands({ page, size: sizePerPage }))
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
            keyField="maThuongHieu"
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
                      <Icon.PlusCircle size="24" className="align-middle mr-2" onClick={() => setOpenCreateModal(true)} />
                      {/* <Icon.Trash2 size="24" className="align-middle mr-2" /> */}
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
      {
        openFileModal && <ModalFile isOpen={openFileModal} closeModal={() => setOpenFileModal(false)} selectedItem={selectedItem} />
      }
    </>
  );
};

const Tables = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Quản Lý Thương Hiệu</h1>
    <Brand />
  </Container>
);

export default Tables;