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

import { TextField, SelectField } from "../../components/Form";

const groups = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
  { label: "E", value: "E" },
  { label: "F", value: "F" },
];

export default function ViewQuotationalDetailMODEL({
  show,
  values,
  setShow,
  rentalSum,
  quotationDetail,
  quotationDetailSchema,
  handleAddCostComponent,
}) {
  const VatPercentage = 5;

  return (
    <Modal show={show} size="xl">
      <Modal.Header>
        <Modal.Title>Quotation Detail</Modal.Title>
      </Modal.Header>
      <Formik
        enableReinitialize
        initialValues={quotationDetail}
        onSubmit={(e) => handleAddCostComponent(e, values)}
        validationSchema={quotationDetailSchema}
      >
        {() => (
          <>
            <Modal.Body>
              <Row>
                <Col>
                  <TextField name="make" label="Make" disabled />
                </Col>
                <Col>
                  <TextField name="model" label="Model" disabled />
                </Col>
                <Col>
                  <SelectField
                    name="group"
                    label="Group"
                    options={groups}
                    isDisabled
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextField
                    name="checkInLocation"
                    label="Check In Location"
                    disabled
                  />
                </Col>
                <Col>
                  <TextField
                    name="checkOutLocation"
                    label="Check Out Location"
                    disabled
                  />
                </Col>
                <Col>
                  <TextField
                    name="numberOfVehicles"
                    label="Number of Vehicles"
                    type="number"
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <FormGroup>
                    <FormLabel>Rental Sum</FormLabel>
                    <input
                      value={rentalSum}
                      className="form-control"
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <TextField name="remark" label="Remark" disabled />
                </Col>
              </Row>
              {quotationDetail?.services.length > 0 && (
                <Card className="mt-3">
                  <Card.Header className="bg-light">
                    <Card.Title>Additional Costs</Card.Title>
                  </Card.Header>
                  <Table bordered size="sm" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th className="text-center">VARIABLE NAME</th>
                        <th className="text-center">AMOUNT</th>
                        <th className="text-center">VAT</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-wrap text-center">
                          {" "}
                          RENTAL SUM(Rate should be taken from the rental rate
                          table provided based on the vehicle group and the
                          rental duration)
                        </td>
                        <td className="text-wrap text-center">
                          {" "}
                          Value for single vehicle should be multiplied with the
                          no. of vehicles entered and should be listed by
                          default
                        </td>
                        <td className="text-wrap text-center">
                          {" "}
                          5% of the value displayed in amount field should be
                          displayed by default
                        </td>
                      </tr>
                      {quotationDetail?.services.map((s) => (
                        <tr key={s.serviceName}>
                          <td className="text-wrap  text-center">
                            {s.serviceName}
                          </td>
                          <td className="text-wrap  text-center">
                            {" "}
                            {!s.total ? s.amount : s.quantity * s.total}
                          </td>
                          <td className="text-wrap  text-center">
                            {Math.floor(
                              (VatPercentage / 100) *
                                (!s.total ? s.amount : s.quantity * s.total)
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                {" "}
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  );
}
