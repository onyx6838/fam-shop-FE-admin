import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Timeline from "./Timeline";
import User from "./User";

const Social = () => (
  <Container className="p-0">
    <Row>
      <Col lg="8">
        <Timeline />
      </Col>
      <Col lg="4">
        <User />
      </Col>
    </Row>
  </Container>
);

export default Social;
