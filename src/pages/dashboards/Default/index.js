import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import Statistics from "./Statistics";
import BarChart from "./BarChart";
import ProductPieChart from "./ProductPieChart";

const Default = () => (
    <Container fluid className="p-0">
        <Row>
            <Col lg={12}>
                <Statistics />
            </Col>
            <Col lg={8}>
                <BarChart />
            </Col>
            <Col lg={4}>
                <ProductPieChart />
            </Col>
        </Row>
    </Container>
);

export default Default;