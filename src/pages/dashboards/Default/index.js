import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import Statistics from "./Statistics";
import BarChart from "./BarChart";
import ProductPieChart from "./ProductPieChart";
import ProductStt from "./ProductStt";

const Default = () => (
    <Container fluid className="p-0">
        <Row>
            <Col lg={12}>
                <Statistics />
            </Col>
            <Col lg={4}>
                <ProductPieChart />
            </Col>
            <Col lg={8}>
                <ProductStt />
            </Col>
            <Col lg={12}>
                <BarChart />
            </Col>
        </Row>
    </Container>
);

export default Default;