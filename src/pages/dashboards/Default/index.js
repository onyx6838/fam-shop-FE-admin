import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import Statistics from "./Statistics";
import BarChart from "./BarChart";
import TimeLine from '../Social/Timeline'

const Default = () => (
    <Container fluid className="p-0">
        <Row>
            <Col lg="12">
                <Statistics />
            </Col>
            <Col lg="6">
                <BarChart />
            </Col>
            <Col lg="6">
                <TimeLine />
            </Col>
        </Row>
    </Container>
);

export default Default;