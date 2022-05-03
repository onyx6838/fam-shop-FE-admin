import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import LoginApi from '../../api/LoginApi'
import storage from "../../storage/storage";
import { useDispatch } from "react-redux";
import { setRefreshToken, setToken, setUserInfo } from "../../redux/slice/userSlice";

function FormSignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        username: "",
        password: ""
      }}

      onSubmit={async (values, { setSubmitting }) => {
        try {
          const user = await LoginApi.login(values.username, values.password);
          storage.setToken(user.token)
          storage.setRefreshToken(user.refreshToken)
          storage.setUserInfo(user)
          dispatch(setUserInfo(user))
          dispatch(setToken(user.token))
          dispatch(setRefreshToken(user.refreshToken))
          navigate("/product")
        } catch (error) {
          if (error.status === 401) {
            console.log(error);
          } else {
            console.log(error);
          }
        }
      }}
      validateOnChange={false}
      validateOnBlur={false}
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
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="username"
              placeholder="Enter your username"
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
          </Form.Group>
          <div className="text-center mt-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
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