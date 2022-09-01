import { Formik } from "formik";
import { Modal, Button, Row, Col } from "react-bootstrap";

import { TextField, SelectField, SubmitBtn } from "../../components/Form";
import countries from "../../data/countryData";

const NewCompanyModel = ({
  show,
  setShow,
  company,
  customers,
  schema,
  handleSubmit,
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={company}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {() => (
        <>
          <Modal show={show} size="lg">
            <Modal.Header>
              <Modal.Title>
                {company.id === 0 ? "New company" : "Update company"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TextField name="name" label="Name" required />
              <Row>
                <Col>
                  <SelectField
                    name="country"
                    label="Country"
                    options={countries().map((c) => ({
                      label: c.name,
                      value: c.name,
                    }))}
                  />
                </Col>
                <Col>
                  <SelectField
                    name="customerId"
                    label="Customer"
                    options={customers?.map((c) => ({
                      value: c.id,
                      label: c.name,
                    }))}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextField name="email" label="Email" />
                </Col>
                <Col>
                  <TextField name="address" label="Address" />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => setShow(false)}
                variant="secondary"
                color="error"
              >
                Close
              </Button>
              <SubmitBtn />
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Formik>
  );
};

export default NewCompanyModel;
