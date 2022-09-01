import { Modal, FormLabel, FormGroup, Button, Row, Col } from "react-bootstrap";
import { Formik } from "formik";

import {
  TextField,
  DateField,
  SubmitBtn,
  SelectField,
} from "../../components/Form";

const groups = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
  { label: "E", value: "E" },
  { label: "F", value: "F" },
];

export default function QuotationDetailModel({ show, quotationDetail }) {
  return (
    <Modal show={show} size="xl">
      <Modal.Header>
        <Modal.Title>Add New Quotational Detail</Modal.Title>
      </Modal.Header>
      <Formik initialValues={quotationDetail}>
        {() => (
          <>
            <Modal.Body>
              <Row>
                <Col>
                  <TextField name="make" label="Make" required />
                </Col>
                <Col>
                  <TextField name="model" label="Model" required />
                </Col>
                <Col>
                  <SelectField
                    name="group"
                    label="Group"
                    options={groups}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextField
                    name="checkInLocation"
                    label="Check In Location"
                    required
                  />
                </Col>
                <Col>
                  <TextField
                    name="checkOutLocation"
                    label="Check Out Location"
                    required
                  />
                </Col>
                <Col>
                  <TextField
                    name="numberOfVehicles"
                    label="Number of Vehicles"
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <FormGroup>
                    <FormLabel>Rental Sum</FormLabel>
                    <input className="form-control" disabled />
                  </FormGroup>
                </Col>
                <Col>
                  <TextField name="remark" label="Remark" />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button>Add</Button>
              <Button variant="secondary"> Close</Button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  );
}
