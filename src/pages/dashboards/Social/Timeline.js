import React from "react";
import { Row, Col, Button, Card } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import avatar4 from "../../../assets/img/avatars/avatar-4.jpg";
import avatar5 from "../../../assets/img/avatars/avatar-5.jpg";

import unsplash2 from "../../../assets/img/photos/unsplash-2.jpg";
import unsplash3 from "../../../assets/img/photos/unsplash-3.jpg";

const Activity = () => (
  <Card className="flex-fill">
    <Card.Body>
      <div className="media">
        <img
          src={avatar5}
          width="56"
          height="56"
          className="rounded-circle mr-3"
          alt="Ashley Briggs"
        />
        <div className="media-body">
          <small className="float-right text-navy">5m ago</small>
          <p className="mb-2">
            <strong>Ashley Briggs</strong>
          </p>
          <p>
            Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem
            quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam
            quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
            Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
            libero venenatis faucibus.
          </p>

          <Row className="mt-1">
            <Col xs="6">
              <img src={unsplash2} className="img-fluid pr-1" alt="Unsplash" />
            </Col>
            <Col xs="6">
              <img src={unsplash3} className="img-fluid pl-1" alt="Unsplash" />
            </Col>
          </Row>

          <small className="text-muted">Today 7:51 pm</small>
          <br />
          <Button size="sm" color="danger" className="mt-1">
            <FontAwesomeIcon icon={faHeart} fixedWidth /> Like
          </Button>

          <div className="media mt-3">
            <div className="pr-2">
              <img
                src={avatar4}
                width="36"
                height="36"
                className="rounded-circle mr-2"
                alt="Stacie Hall"
              />
            </div>
            <div className="media-body">
              <p className="text-muted">
                <strong>Stacie Hall</strong>: Nam pretium turpis et arcu. Duis
                arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis,
                ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan
                a, consectetuer eget, posuere ut, mauris.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card.Body>
  </Card>
);

export default Activity;
