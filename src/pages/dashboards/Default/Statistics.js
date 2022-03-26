import React from "react";
import { Col, Card, Row } from "react-bootstrap";

import { ShoppingCart, Activity, DollarSign, ShoppingBag } from "react-feather";

const Statistics = () => (
  <Row>
    <Col md="6" xl>
      <Card className="flex-fill">
        <Card.Body className="py-4">
          <Card>
            <div className="d-inline-block mt-2 mr-3">
              <ShoppingCart className="feather-lg text-primary" />
            </div>
            <Card.Body>
              <h3 className="mb-2">2.562</h3>
              <div className="mb-0">Sales Today</div>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Col>
    <Col md="6" xl>
      <Card className="flex-fill">
        <Card.Body className="py-4">
          <Card>
            <div className="d-inline-block mt-2 mr-3">
              <Activity className="feather-lg text-warning" />
            </div>
            <Card.Body>
              <h3 className="mb-2">17.212</h3>
              <div className="mb-0">Visitors Today</div>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Col>
    <Col md="6" xl>
      <Card className="flex-fill">
        <Card.Body className="py-4">
          <Card>
            <div className="d-inline-block mt-2 mr-3">
              <DollarSign className="feather-lg text-success" />
            </div>
            <Card.Body>
              <h3 className="mb-2">$ 24.300</h3>
              <div className="mb-0">Total Earnings</div>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Col>
    <Col md="6" xl>
      <Card className="flex-fill">
        <Card.Body className="py-4">
          <Card>
            <div className="d-inline-block mt-2 mr-3">
              <ShoppingBag className="feather-lg text-danger" />
            </div>
            <Card.Body>
              <h3 className="mb-2">43</h3>
              <div className="mb-0">Pending Orders</div>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Col>
    <Col md="6" xl className="d-none d-xxl-flex">
      <Card className="flex-fill">
        <Card.Body className="py-4">
          <Card>
            <div className="d-inline-block mt-2 mr-3">
              <DollarSign className="feather-lg text-info" />
            </div>
            <Card.Body>
              <h3 className="mb-2">$ 18.700</h3>
              <div className="mb-0">Total Revenue</div>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Col>
  </Row>
);

export default Statistics;
