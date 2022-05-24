import React, { useEffect } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

import { useDispatch, useSelector } from 'react-redux'
import { changeFeaturesNonGrSelectedRows, fetchFeaturesNonGr, fetchProductFeatures } from '../../../redux/slice/productFeatureSlice';
import DacTrungSanPhamApi from '../../../api/DacTrungSanPhamApi'

import './modalProductFeature.css'

import Swal from "sweetalert2";
import * as Icon from 'react-feather'
import reduxNotification from '../../../components/ReduxNotification';

const ModalProductFeature = ({ isOpen, closeModal, selectedItem }) => {
  const dispatch = useDispatch();
  const size = useSelector(state => state.productFeature.size);
  const page = useSelector(state => state.productFeature.page);
  const totalElements = useSelector(state => state.productFeature.totalElements);
  const productFeatures = useSelector(state => state.productFeature.productFeatures);

  const sizePf = useSelector(state => state.productFeature.sizeNonGr);
  const pagePf = useSelector(state => state.productFeature.pageNonGr);
  const totalElementsPf = useSelector(state => state.productFeature.totalElementsNonGr);
  const features = useSelector(state => state.productFeature.featuresNonGr);
  const featuresNonGrSelectedRows = useSelector(state => state.productFeature.featuresNonGrSelectedRows);

  useEffect(() => {
    dispatch(fetchFeaturesNonGr({ page: 1, size: sizePf }))
    dispatch(fetchProductFeatures({ page: 1, size, maSP: selectedItem.maSP }))
  }, [dispatch, selectedItem.maSP, size, sizePf])

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

  const configPaginationSecondTable = {
    page: pagePf,
    totalSize: totalElementsPf,
    sizePerPage: sizePf,
    nextPageText: '>',
    prePageText: '<',
    withFirstAndLast: false,
    alwaysShowAllBtns: true,
    hideSizePerPage: true
  };

  const rankFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <Icon.Trash2 size="24" className="align-middle mr-2" onClick={() => removeDacTrungSP(row)} />
      </div>
    );
  };

  const tableColumnProductFeature = [
    {
      dataField: "maDacTrung",
      text: "Mã ĐT",
      headerAttrs: { width: 70 }
    },
    {
      dataField: "ten",
      text: "Tên"
    },
    {
      dataField: "moTa",
      text: "Mô tả"
    },
    {
      dataField: "giaTri",
      text: "Giá trị"
    },
    {
      dataField: "donVi",
      text: "Đơn vị"
    },
    {
      dataField: "loaiDacTrung",
      text: "Loại đặc trưng"
    },
    {
      dataField: "edit",
      text: "Edit",
      sort: false,
      formatter: rankFormatter,
      headerAttrs: { width: 50 }
    }
  ];

  const tableColumnProductFeatureSecond = [
    {
      dataField: "maDacTrung",
      text: "Mã ĐT",
      headerAttrs: { width: 70 }
    },
    {
      dataField: "ten",
      text: "Tên"
    },
    {
      dataField: "moTa",
      text: "Mô tả"
    },
    {
      dataField: "giaTri",
      text: "Giá trị"
    },
    {
      dataField: "donVi",
      text: "Đơn vị"
    },
    {
      dataField: "loaiDacTrung",
      text: "Loại đặc trưng"
    }
  ];

  const handleTableChange = (type, { page, sizePerPage }) => {
    dispatch(fetchProductFeatures({ page: page, size: sizePerPage, maSP: selectedItem.maSP }))
  }

  const handleSecondTableChange = (type, { page, sizePerPage }) => {
    dispatch(fetchFeaturesNonGr({ page, size: sizePerPage }))
  }

  const handleOnSelect = (row, isSelect) => {
    let selected = featuresNonGrSelectedRows;
    if (isSelect) {
      selected = [...selected, row.maDacTrung]
    } else {
      selected = selected.filter(x => x !== row.maDacTrung)
    }

    dispatch(changeFeaturesNonGrSelectedRows(selected))
  }

  const handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r.maDacTrung);
    let selected = [];

    if (isSelect) {
      selected = ids;
    }

    dispatch(changeFeaturesNonGrSelectedRows(selected))
  }

  const selectRowOptionSecondTable = {
    mode: 'checkbox',
    clickToSelect: true,
    selected: featuresNonGrSelectedRows,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll
  }

  const addDacTrungToSP = async () => {
    Swal.fire({
      title: 'Thêm đặc trưng sản phẩm',
      text: 'Thay đổi đặc trưng sản phẩm?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        const response = DacTrungSanPhamApi.addDacTrungToSP({
          maSP: selectedItem.maSP,
          dacTrungs: featuresNonGrSelectedRows
        })
        response.then((r) => {
          reduxNotification.showSuccessNotification(
            "Change Feature Product",
            "Change Feature Product Successfully!");
          dispatch(fetchProductFeatures({ page: 1, size, maSP: selectedItem.maSP }))
          dispatch(changeFeaturesNonGrSelectedRows([]))
        }).catch((error) => {
          console.log(error);
          reduxNotification.showWrongNotification(
            "Change Feature Product",
            "Change Feature Product Failed!");
        })
      }
    })
  }

  const removeDacTrungSP = (data) => {
    Swal.fire({
      title: 'Xóa đặc trưng sản phẩm',
      text: 'Thay đổi trưng sản phẩm?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        const response = DacTrungSanPhamApi.deleteDacTrungSP({
          maSP: selectedItem.maSP,
          maDacTrung: data.maDacTrung
        })
        response.then((r) => {
          reduxNotification.showSuccessNotification(
            "Change Feature Product",
            "Remove Feature Product Successfully!");
          dispatch(fetchProductFeatures({ page: 1, size, maSP: selectedItem.maSP }))
        }).catch((error) => {
          console.log(error);
          reduxNotification.showWrongNotification(
            "Change Feature Product",
            "Remove Feature Product Failed!");
        })
      }
    })
  }

  return (
    <Modal show={isOpen} dialogClassName="my-modal">
      <Modal.Header>
        Cập nhật danh sách đặc trưng của sản phẩm {selectedItem.ten}
        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-lg-6">
            <ToolkitProvider
              keyField="maDacTrung"
              data={productFeatures}
              columns={tableColumnProductFeature}
              search
            >
              {toolkitprops => (
                <>
                  <Row style={{ alignItems: "flex-end" }}>
                    <Col lg="7">

                    </Col>
                    <Col lg="5" style={{ paddingBottom: 20 }}>
                      <div className="float-right pull-right">
                        Danh sách đặc trưng của sản phẩm
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
          </div>
          <div className="col-lg-6">
            <ToolkitProvider
              keyField="maDacTrung"
              data={features}
              columns={tableColumnProductFeatureSecond}
              search
            >
              {toolkitprops => (
                <>
                  <Row style={{ alignItems: "flex-end" }}>
                    <Col lg="9">

                    </Col>
                    <Col lg="3" style={{ paddingBottom: 20 }}>
                      <div className="float-right pull-right">
                        Danh sách đặc trưng
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
                    pagination={paginationFactory(configPaginationSecondTable)}
                    onTableChange={handleSecondTableChange}
                    selectRow={selectRowOptionSecondTable}
                  />
                </>
              )}
            </ToolkitProvider>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => addDacTrungToSP()}>
          Thêm đặc trưng
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalProductFeature