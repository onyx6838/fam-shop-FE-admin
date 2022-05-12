import React, { useEffect, useState } from "react";
import { Col, Card, Row } from "react-bootstrap";
import { ShoppingCart, DollarSign, ShoppingBag, UserCheck } from "react-feather";

import ThongKeApi from '../../../api/ThongKeApi'

const Statistics = () => {
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalProductSold, setTotalProductSold] = useState(0)
  const [ordCountWithType, setOrdCountWithType] = useState(0)
  const [totalCustomerOrderSuccess, setTotalCustomerOrderSuccess] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      let ttRe = await ThongKeApi.totalRevenue();
      setTotalRevenue(ttRe);

      let prdSold = await ThongKeApi.totalProductSold();
      setTotalProductSold(prdSold);

      let ordCount = await ThongKeApi.countOrderWithType('DON_DAT');
      setOrdCountWithType(ordCount);

      let customerOrderSuccess = await ThongKeApi.countCustomerBuyOrderDone(new Date().getFullYear());
      setTotalCustomerOrderSuccess(customerOrderSuccess);
    }
    fetchData()
  }, [])

  return (
    <Row>
      <Col md="6" xl>
        <Card className="flex-fill">
          <Card.Body className="py-4">
            <Card>
              <div className="d-inline-block mt-2 mr-3">
                <ShoppingCart className="feather-lg text-primary" />
              </div>
              <Card.Body>
                <h3 className="mb-2">{totalProductSold}</h3>
                <div className="mb-0">Số sản phẩm bán ra</div>
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
                <h3 className="mb-2">{(new Intl.NumberFormat('de-DE').format(totalRevenue))} đ</h3>
                <div className="mb-0">Tổng doanh thu</div>
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
                <h3 className="mb-2">{ordCountWithType}</h3>
                <div className="mb-0">Số đơn đặt hàng</div>
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
                <UserCheck className="feather-lg text-success" />
              </div>
              <Card.Body>
                <h3 className="mb-2">{totalCustomerOrderSuccess}</h3>
                <div className="mb-0">Đặt hàng thành công ({(new Date().getFullYear())})</div>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default Statistics;
