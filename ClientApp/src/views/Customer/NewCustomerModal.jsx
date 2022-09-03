import { Formik } from "formik";
import { Modal, Button, Col, Row } from "react-bootstrap";

import {
  DateField,
  TextField,
  SubmitBtn,
  SelectField,
} from "../../components/Form";
import nationalities from "../../data/nationalities.json";

const categories = [
  { value: "Resident", label: "Resident" },
  { value: "Tourist", label: "Tourist" },
];

const NewCustomerModal = ({
  show,
  schema,
  setShow,
  customer,
  handleSubmit,
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={customer}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {() => (
        <>
          <Modal show={show} size="xl">
            <Modal.Header>
              <Modal.Title>
                {customer.id === 0 ? "New Customer" : "Update Customer"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <TextField name="name" label="Name" required />
                </Col>
                <Col>
                  <TextField name="telephone" label="Telephone" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <SelectField
                    required
                    name="category"
                    label="Category"
                    options={categories}
                  />
                </Col>
                <Col>
                  <SelectField
                    name="nationality"
                    label="Nationality"
                    options={nationalities.map((n) => ({ value: n, label: n }))}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextField name="identityType" label="Id Type" />
                </Col>
                <Col>
                  <TextField name="identityId" label="Id" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <DateField name="identityIssueDate" label="Issue Date" />
                </Col>
                <Col>
                  <DateField name="identityExpiryDate" label="Expiry Date" />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
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

export default NewCustomerModal;
