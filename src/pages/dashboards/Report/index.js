import React from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import * as Icon from "react-feather";

const Report = () => {
    return (
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Card.Title>Các báo cáo</Card.Title>
                        <h6 className="card-subtitle text-muted">
                            Tải xuống để tra cứu, xem thông tin và lưu trữ
                        </h6>
                    </Card.Header>
                    <Table>
                        <thead>
                            <tr>
                                <th style={{ width: "90%" }}>Tên báo cáo</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Quản lý sản phẩm</td>
                                <td className="table-action">
                                    <a href='http://localhost:8080/api/v1/admin/baocao/sanphams/export/excel'
                                        target='_blank' download rel="noopener noreferrer">
                                        <Icon.Download className="align-middle me-1" size={18}></Icon.Download>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>Lượng sản phẩm bán ra theo từng tháng trong năm nay ({new Date().getFullYear()})</td>
                                <td className="table-action">
                                    <a href={`http://localhost:8080/api/v1/admin/baocao/sp-ban-thang-nam/export/excel/${new Date().getFullYear()}`}
                                        target='_blank' download rel="noopener noreferrer">
                                        <Icon.Download className="align-middle me-1" size={18}></Icon.Download>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>Doanh thu tổng hợp</td>
                                <td className="table-action">
                                    <a href={`http://localhost:8080/api/v1/admin/baocao/bcao-tong-hop/export/excel/${new Date().getFullYear()}`}
                                        target='_blank' download rel="noopener noreferrer">
                                        <Icon.Download className="align-middle me-1" size={18}></Icon.Download>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </Col>
        </Row>
    )
}

const Tables = () => (
    <Container fluid className="p-0">
        <h1 className="h3 mb-3">Một số báo cáo của cửa hàng FamShop</h1>
        <Report />
    </Container>
);

export default Tables;