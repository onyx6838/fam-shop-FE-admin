import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import * as Icon from 'react-feather'

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ModalGroupFeature from "./ModalGroupFeature";

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useDispatch, useSelector } from "react-redux";
import { fetchFeatures } from "../../../redux/slice/featureSlice";
import ModalCreateGroupFeature from "./ModalCreateGroupFeature";

const Feature = () => {
  const dispatch = useDispatch();
  const size = useSelector(state => state.feature.size);
  const page = useSelector(state => state.feature.page);
  const totalElements = useSelector(state => state.feature.totalElements);
  const features = useSelector(state => state.feature.features);
  const [openGroupFeatureModal, setOpenGroupFeatureModal] = useState(false);
  const [openCreateGroupFeatureModal, setOpenCreateGroupFeatureModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({})

  useEffect(() => {
    dispatch(fetchFeatures({ page: 1, size }))
  }, [dispatch, size])

  const groupFeatureFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <Icon.List size="24" className="align-middle mr-2" onClick={() => {
          setOpenGroupFeatureModal(true)
          setSelectedItem(row)
        }} />
        <Icon.Trash2 size="24" className="align-middle mr-2" />
      </div>
    );
  };

  const tableColumnFeatures = [
    {
      dataField: "maDacTrung",
      text: "Mã ĐT"
    },
    {
      dataField: "loaiDacTrung",
      text: "Loại đặc trưng"
    },
    {
      dataField: "edit",
      text: "Edit",
      sort: false,
      formatter: groupFeatureFormatter,
      headerAttrs: { width: 100 }
    }
  ];

  const handleTableChange = (type, { page, sizePerPage }) => {
    dispatch(fetchFeatures({ page, size: sizePerPage }))
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
            keyField="maDacTrung"
            data={features}
            columns={tableColumnFeatures}
            search
          >
            {toolkitprops => (
              <>
                <Row style={{ alignItems: "flex-end" }}>
                  <Col lg="9">

                  </Col>
                  <Col lg="3" style={{ paddingBottom: 20 }}>
                    <div className="float-right pull-right">
                      <Icon.PlusCircle size="24" className="align-middle mr-2" onClick={() => setOpenCreateGroupFeatureModal(true)} />
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
        openGroupFeatureModal && <ModalGroupFeature isOpen={openGroupFeatureModal}
          closeModal={() => setOpenGroupFeatureModal(false)} selectedItem={selectedItem} />
      }
      {
        openCreateGroupFeatureModal && <ModalCreateGroupFeature isOpen={openCreateGroupFeatureModal}
          closeModal={() => setOpenCreateGroupFeatureModal(false)} />
      }
    </>
  );
};

const Tables = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Quản lý đặc trưng</h1>
    <Feature />
  </Container>
);

export default Tables;