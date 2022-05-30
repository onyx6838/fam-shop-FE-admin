import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGroupFeatures } from '../../../redux/slice/featureSlice'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import * as Icon from 'react-feather'
import FormCreateFeature from './FormCreateFeature';
import FormUpdateFeature from './FormUpdateFeature';

const ModalGroupFeature = ({ isOpen, closeModal, selectedItem }) => {
    const dispatch = useDispatch();
    const size = useSelector(state => state.feature.sizeGr);
    const page = useSelector(state => state.feature.pageGr);
    const totalElements = useSelector(state => state.feature.totalElementsGr);
    const groupFeatures = useSelector(state => state.feature.groupFeatures);
    const [openFormCreateFeature, setOpenFormCreateFeature] = useState(false)
    const [openFormUpdateFeature, setOpenFormUpdateFeature] = useState(false)
    const [selectedFeatureItem, setSelectedFeatureItem] = useState({})

    useEffect(() => {
        dispatch(fetchGroupFeatures({ page: 1, size, loaiDacTrung: selectedItem.loaiDacTrung }))
    }, [dispatch, selectedItem.loaiDacTrung, size])

    const featureFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <Icon.Edit size="24" className="align-middle mr-2" onClick={() => {
                    setOpenFormUpdateFeature((state) => !state)
                    setSelectedFeatureItem(row)
                }} />
            </div>
        );
    };

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

    const tableColumnGroupFeature = [
        {
            dataField: "maDacTrung",
            text: "Mã ĐT"
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
            dataField: "edit",
            text: "Edit",
            sort: false,
            formatter: featureFormatter,
            headerAttrs: { width: 80 }
        }
    ];

    const refreshForm = () => {
        handleTableChange(null, {
            page: 1,
            sizePerPage: size
        })
    }

    const handleTableChange = (type, { page, sizePerPage }) => {
        dispatch(fetchGroupFeatures({ page: page, size: sizePerPage, loaiDacTrung: selectedItem.loaiDacTrung }))
    }

    return (
        <Modal show={isOpen} size='lg'>
            <Modal.Header>
                Danh sách các đặc trưng thuộc loại
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </Modal.Header>
            <Modal.Body style={{ 'height': `${openFormCreateFeature || openFormUpdateFeature ? '730px' : '380px'}` }}>
                <ToolkitProvider
                    keyField="maDacTrung"
                    data={groupFeatures}
                    columns={tableColumnGroupFeature}
                    search
                >
                    {
                        toolkitprops => (
                            <>
                                <Row style={{ alignItems: "flex-end" }}>
                                    <Col lg="9">

                                    </Col>
                                    <Col lg="3" style={{ paddingBottom: 20 }}>
                                        <div className="float-right pull-right">
                                            <Icon.PlusCircle size="24" className="align-middle mr-2"
                                                onClick={() => {
                                                    setOpenFormCreateFeature((state) => !state)
                                                }} />
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
                        )
                    }
                </ToolkitProvider>
                {
                    openFormCreateFeature && <FormCreateFeature loaiDacTrung={selectedItem.loaiDacTrung} refreshForm={refreshForm} closeForm={() => setOpenFormCreateFeature(false)} />
                }
                {
                    openFormUpdateFeature && <FormUpdateFeature selectedItem={selectedFeatureItem} refreshForm={refreshForm} closeForm={() => setOpenFormUpdateFeature(false)} />
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalGroupFeature