import { useState } from "react";
import { Card, Button, Alert, Row, Col } from "react-bootstrap";

import * as Yup from "yup";
import { Formik } from "formik";

import authApi from "../../../api/authApi";

const schema = Yup.object().shape({
  username: Yup.string().max(255).required("Username is required"),
  password: Yup.string().max(255).required("Password is required"),
});

const Signin = () => {
  const [user] = useState({ username: "", password: "" });
  const [errorsMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    const response = await authApi.login(values);
    setLoading(false);

    if (response.ok) {
      localStorage.setItem("token", response.data.token);
      window.location = "/";

      return setErrorMessage(false);
    }

    return setErrorMessage(true);
  };

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card>
            <Card.Body>
              <div className="mb-4 text-center">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <Formik
                initialValues={user}
                validationSchema={schema}
                onSubmit={handleSubmit}
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
                  <form noValidate onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <input
                        className="form-control"
                        error={touched.email && errors.email}
                        label="Username"
                        name="username"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.username}
                        placeholder="Username"
                      />
                      {touched.username && errors.username && (
                        <small className="text-danger form-text">
                          {errors.username}
                        </small>
                      )}
                    </div>
                    <div className="form-group mb-4">
                      <input
                        className="form-control"
                        error={touched.password && errors.password}
                        label="Password"
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                        placeholder="Password"
                      />
                      {touched.password && errors.password && (
                        <small className="text-danger form-text">
                          {errors.password}
                        </small>
                      )}
                    </div>

                    {errorsMessage && (
                      <Col sm={12}>
                        <Alert variant="danger">
                          Invalid username or password
                        </Alert>
                      </Col>
                    )}

                    <Row>
                      <Col mt={2}>
                        <Button
                          className="btn-block"
                          color="primary"
                          disabled={loading}
                          size="large"
                          type="submit"
                          variant="primary"
                        >
                          {loading ? "... Loading" : "Sign In"}
                        </Button>
                      </Col>
                    </Row>
                  </form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Signin;
