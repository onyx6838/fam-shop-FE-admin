import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import * as Icon from 'react-feather'

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/slice/productSlice";
import ModalProductFeature from "./ModalProductFeature";

const ProductFeature = () => {
  const dispatch = useDispatch();
  const size = useSelector(state => state.product.size);
  const page = useSelector(state => state.product.page);
  const totalElements = useSelector(state => state.product.totalElements);
  const products = useSelector(state => state.product.products);

  const [selectedItem, setSelectedItem] = useState({})
  const [openProductFeatureModal, setOpenProductFeatureModal] = useState(false)

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, size }))
  }, [dispatch, size])

  const productFeatureFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <Icon.Settings size="24" className="align-middle mr-2" onClick={() => {
          setOpenProductFeatureModal(true)
          setSelectedItem(row)
        }} />
      </div>
    );
  };

  const tableColumnsProduct = [
    {
      dataField: "maSP",
      text: "Mã SP"
    },
    {
      dataField: "ten",
      text: "Tên"
    },
    {
      dataField: "moTa",
      text: "Mô Tả"
    },
    {
      dataField: "soLuong",
      text: "Số Lượng"
    },
    {
      dataField: "donGiaBan",
      text: "Đơn Giá Bán"
    },
    {
      dataField: "donGiaNhap",
      text: "Đơn Giá Nhập"
    },
    {
      dataField: "edit",
      text: "Edit",
      sort: false,
      formatter: productFeatureFormatter,
      headerAttrs: { width: 100 }
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
    <>
      <Card>
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
        openProductFeatureModal && <ModalProductFeature isOpen={openProductFeatureModal}
          closeModal={() => setOpenProductFeatureModal(false)} selectedItem={selectedItem}/>
      }
    </>
  );
};

const Tables = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Quản lý Đặc Trưng Sản Phẩm</h1>
    <ProductFeature />
  </Container>
);

export default Tables;