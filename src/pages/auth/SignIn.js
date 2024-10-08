import React from "react";
import { Card } from "react-bootstrap";

import avatar from "../../assets/img/avatars/avatar.jpg";
import FormSignIn from "./FormSignIn";

const SignIn = () => (
  <>
    <div className="text-center mt-4">
      <h2>Welcome back</h2>
      <p className="lead">Sign in to your account to continue</p>
    </div>
    <Card>
      <Card.Body>
        <div className="m-sm-4">
          <div className="text-center">
            <img
              src={avatar}
              alt="Chris Wood"
              className="img-fluid rounded-circle"
              width="132"
              height="132"
            />
          </div>
          <FormSignIn />
        </div>
      </Card.Body>
    </Card>
  </>
);

export default SignIn;