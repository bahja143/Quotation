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

export default function QuotationDetailModel({
  show,
  setShow,
  components,
  accessories,
  setComponents,
  componentsData,
  setAccessories,
  quotationDetail,
  handleAddService,
  handleUpdateService,
  quotationDetailSchema,
  handleAddCostComponent,
}) {
  const VatPercentage = 5;
  const handleOnChangeComponent = (service) => {
    setComponents([
      ...componentsData.map((c) => {
        if (c.serviceName === service.serviceName) {
          c.amount = service.amount;
          handleUpdateService(c);

          return c;
        }

        return c;
      }),
    ]);
  };
  const handleOnChangeAccessories = (service) => {
    setAccessories([
      ...accessories.map((c) => {
        if (c.serviceName === service.serviceName) {
          c.total = service.total;
          c.quantity = service.quantity;
          handleUpdateService({
            ...service,
            amount: service.total * service.quantity,
          });

          console.log({
            ...service,
          });

          return c;
        }

        return c;
      }),
    ]);
  };
  const handleComponentService = (service) => {
    setComponents([
      ...components.map((c) => {
        if (c.serviceName === service.serviceName) {
          c.status = c.status ? false : true;

          return c;
        }

        return c;
      }),
    ]);

    handleAddService({
      ...components.find((c) => c.serviceName === service.serviceName),
    });
  };
  const handleAccessoriesService = (service) => {
    setAccessories([
      ...accessories.map((c) => {
        if (c.serviceName === service.serviceName) {
          c.status = c.status ? false : true;

          return c;
        }

        return c;
      }),
    ]);

    let result = accessories
      .map((a) => {
        a.amount = a.total * a.quantity;

        return a;
      })
      .find((c) => c.serviceName === service.serviceName);

    handleAddService({
      ...result,
    });
  };

  return (
    <Modal show={show} size="xl">
      <Modal.Header>
        <Modal.Title>Add New Quotational Detail</Modal.Title>
      </Modal.Header>
      <Formik
        enableReinitialize
        initialValues={quotationDetail}
        onSubmit={handleAddCostComponent}
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
                    type="number"
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
              <Row className="mt-3">
                <Col>
                  <Card>
                    <Card.Header className="bg-light">
                      <Card.Text>Add Cost Components</Card.Text>
                    </Card.Header>
                    <Table>
                      <thead>
                        <tr>
                          <th>Selection</th>
                          <th>Accessories</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {components.map((c) => (
                          <tr key={c.serviceName}>
                            <td>
                              <input
                                type="checkbox"
                                name="check"
                                checked={c.status}
                                onChange={() => handleComponentService(c)}
                                className="form-control"
                              />
                            </td>
                            <td>{c.serviceName}</td>
                            <td>
                              <input
                                type="number"
                                name="amount"
                                value={c.amount}
                                onChange={(e) =>
                                  handleOnChangeComponent({
                                    serviceName: c.serviceName,
                                    amount: e.target.value,
                                  })
                                }
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
                    <Card.Header className="bg-light">
                      <Card.Text>Vehicle Accessories/Extra Selection</Card.Text>
                    </Card.Header>
                    <Table>
                      <thead>
                        <tr>
                          <th>Selection</th>
                          <th>Accessories</th>
                          <th>Quantity</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {accessories.map((c) => (
                          <tr key={c.serviceName}>
                            <td>
                              <input
                                type="checkbox"
                                name="check"
                                checked={c.status}
                                onChange={() => handleAccessoriesService(c)}
                                className="form-control"
                              />
                            </td>
                            <td>{c.serviceName}</td>
                            <td>
                              <input
                                type="number"
                                name="quantity"
                                onChange={(e) =>
                                  handleOnChangeAccessories({
                                    serviceName: c.serviceName,
                                    quantity: e.target.value,
                                    total: c.total,
                                  })
                                }
                                className="form-control"
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name="total"
                                onChange={(e) =>
                                  handleOnChangeAccessories({
                                    serviceName: c.serviceName,
                                    total: e.target.value,
                                    quantity: c.quantity,
                                  })
                                }
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
              {quotationDetail?.services.length > 0 && (
                <Card>
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
                            {s.amount}
                          </td>
                          <td className="text-wrap  text-center">
                            {Math.floor((VatPercentage / 100) * s.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              )}
            </Modal.Body>
            <Modal.Footer>
              <SubmitBtn title="Add" />
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
