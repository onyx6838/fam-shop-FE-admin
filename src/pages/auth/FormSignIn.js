import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Alert, Button, Form } from "react-bootstrap";
import LoginApi from '../../api/LoginApi'
import storage from "../../storage/storage";
import { useDispatch } from "react-redux";

function FormSignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        username: "demo@bootlab.io",
        password: "unsafepassword",
        submit: false,
      }}

      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {

          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            navigate("/product")
          }, 400);

          const user = await LoginApi.login(values.username, values.password);
          //storage.setRememberMe(isRememberMe);
          storage.setToken(user.token)
          storage.setRefreshToken(user.refreshToken)
          storage.setUserInfo(user)

          // dispatch(setRememberMe(isRememberMe))
          // dispatch(setUserInfo(user))
          // dispatch(setToken(user.token))
          // dispatch(setRefreshToken(user.refreshToken))
          navigate("/home")

        } catch (error) {
          const message = error.message || "Something went wrong";

          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Alert className="my-3" variant="primary">
            <div className="alert-message">
              Use <strong>demo@bootlab.io</strong> and{" "}
              <strong>unsafepassword</strong> to sign in
            </div>
          </Alert>
          {errors.submit && (
            <Alert className="my-3" variant="danger">
              <div className="alert-message">{errors.submit}</div>
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="username"
              placeholder="Enter your email"
              value={values.username}
              isInvalid={Boolean(touched.username && errors.username)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.username && (
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              size="lg"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              isInvalid={Boolean(touched.password && errors.password)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.password && (
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            )}
            <small>
              <Link to="/auth/reset-password">Forgot password?</Link>
            </small>
          </Form.Group>

          {/* <div>
            <Form.Check
              type="checkbox"
              id="rememberMe"
              label="Remember me next time"
              defaultChecked
            />
          </div> */}

          <div className="text-center mt-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
            >
              Sign in
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default FormSignIn;