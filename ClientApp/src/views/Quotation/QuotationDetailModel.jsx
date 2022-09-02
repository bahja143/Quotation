import {
  Col,
  Row,
  Card,
  Modal,
  Table,
  Button,
  FormLabel,
  FormGroup,
} from "react-bootstrap";
import { Formik } from "formik";

import { TextField, SubmitBtn, SelectField } from "../../components/Form";

const groups = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
  { label: "E", value: "E" },
  { label: "F", value: "F" },
];
const components = [
  "Accessories",
  "Presel fuel",
  "Collection",
  "Delivery",
  "SCDW",
  "WS",
];
const accessories = ["Baby Seat", "Wifi", "ADI"];

export default function QuotationDetailModel({
  show,
  quotationDetail,
  quotationDetailSchema,
}) {
  return (
    <Modal show={show} size="xl">
      <Modal.Header>
        <Modal.Title>Add New Quotational Detail</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={quotationDetail}
        validationSchema={quotationDetailSchema}
      >
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
              <Row>
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Text>Add Cost Components</Card.Text>
                    </Card.Header>
                    <Table>
                      <thead>
                        <th>Selection</th>
                        <th>Accessories</th>
                        <th>Amount</th>
                      </thead>
                      <tbody>
                        {components.map((c) => (
                          <tr>
                            <td>
                              <input
                                type="checkbox"
                                name="check"
                                className="form-control"
                              />
                            </td>
                            <td>{c}</td>
                            <td>
                              <input
                                type="text"
                                name="amount"
                                className="form-control"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Text>Vehicle Accessories/Extra Selection</Card.Text>
                    </Card.Header>
                    <Table>
                      <thead>
                        <th>Selection</th>
                        <th>Accessories</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                      </thead>
                      <tbody>
                        {accessories.map((c) => (
                          <tr>
                            <td>
                              <input
                                type="checkbox"
                                name="check"
                                className="form-control"
                              />
                            </td>
                            <td>{c}</td>
                            <td>
                              <input
                                type="text"
                                name="quantity"
                                className="form-control"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="amount"
                                className="form-control"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Col>
                    <Card>
                      <Table>
                        <thead>
                          <th>VARIABLE NAME</th>
                          <th>AMOUNT</th>
                          <th>VAT</th>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              RENTAL SUM(Rate should be taken from the rental
                              rate table provided based on the vehicle group and
                              the rental duration)
                            </td>
                            <td>
                              Value for single vehicle should be multiplied with
                              the no. of vehicles entered and should be listed
                              by default
                            </td>
                            <td>
                              5% of the value displayed in amount field should
                              be displayed by default
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card>
                  </Col>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <SubmitBtn title="Add" />
              <Button variant="secondary"> Close</Button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  );
}
