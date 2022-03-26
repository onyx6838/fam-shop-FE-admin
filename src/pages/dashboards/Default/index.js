import React from "react";
import { Container } from "react-bootstrap";

import Statistics from "./Statistics";
import Timeline from "../Social/Timeline";

const Default = () => (
    <Container fluid className="p-0">
        <Statistics />
        <Timeline/>
    </Container>
);

export default Default;
