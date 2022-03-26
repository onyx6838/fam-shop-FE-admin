import React from "react";

import { Col, Container, Row } from "react-bootstrap";

import Main from "../components/Main.js";
import Settings from "../components/Settings";

const Auth = ({ children }) => (
  <>
    <Main className="d-flex w-100 justify-content-center">
      <Container className="d-flex flex-column">
        <Row className="h-100">
          <Col sm="10" md="8" lg="6" className="mx-auto d-table h-100">
            <div className="d-table-cell align-middle">{children}</div>
          </Col>
        </Row>
      </Container>
    </Main>
    <Settings />
  </>
);

export default Auth;
