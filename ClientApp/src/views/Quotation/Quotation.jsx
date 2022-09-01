import { useState, useEffect } from "react";
import { Formik } from "formik";
import Fontawesome from "react-fontawesome";
import * as Yup from "yup";

import {
  Col,
  Row,
  Card,
  Table,
  Button,
  FormLabel,
  FormGroup,
} from "react-bootstrap";
import {
  SubmitBtn,
  DateField,
  TextField,
  SelectField,
} from "../../components/Form";

import QuotationDetailModel from "./QuotationDetailModel";

import companyApi from "../../api/companiesApi";
import branchesApi from "../../api/branchesApi";
import customersApi from "../../api/customersApi";

const categories = [
  { label: "Domestic", values: "Domestic" },
  { label: "International", values: "International" },
];

const schema = Yup.object({
  id: Yup.number(),
  category: Yup.string().label("Category"),
  companyId: Yup.number().required().label("Company"),
  branchId: Yup.number().required().label("Branch"),
  debitorId: Yup.number().required().label("Debitor"),
  expiryDate: Yup.date().required().label("Expiry date"),
  rentStartDate: Yup.date().required().label("Rental start date"),
  rentEndDate: Yup.date().required().label("Rental end date"),
  rentSum: Yup.number().required().label("Rental sum"),
  date: Yup.date().required().label("Date"),
});

export default function Quotation() {
  const [quotation] = useState({
    id: 0,
    category: "",
    companyId: "",
    branchId: "",
    debitorId: "",
    expiryDate: "",
    rentStartDate: "",
    rentEndDate: "",
    rentSum: "",
    date: "",
  });
  const [quotationDetail] = useState({
    make: "",
    model: "",
    group: "",
    remark: "",
    Services: "",
    checkInLocation: "",
    checkOutLocation: "",
    numberOfVehicles: "",
  });
  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);
  const [customers, setCustomers] = useState([]);

  const handleLoad = async () => {
    const response = await companyApi.getAll();
    const response1 = await branchesApi.getAll();
    const response2 = await customersApi.getAll();

    if (response.ok) setCompanies(response.data);
    if (response1.ok) setBranches(response1.data);
    if (response2.ok) setCustomers(response2.data);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <QuotationDetailModel show={true} quotationDetail={quotationDetail} />
      <Formik initialValues={quotation} validationSchema={schema}>
        {() => (
          <Card>
            <Card.Header>
              <Card.Title>Quotation Form</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <SelectField
                    name="companyId"
                    label="Company"
                    options={companies.map((c) => ({
                      label: c.name,
                      value: c.id,
                    }))}
                    required
                  />
                </Col>
                <Col>
                  <SelectField
                    name="branchId"
                    label="Branch"
                    options={branches.map((c) => ({
                      label: c.name,
                      value: c.id,
                    }))}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <SelectField
                    name="debitorId"
                    label="Debitor"
                    options={customers.map((c) => ({
                      label: c.name,
                      value: c.id,
                    }))}
                    required
                  />
                </Col>

                <Col>
                  <SelectField
                    name="category"
                    label="Quotation  Category"
                    options={categories}
                  />
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Text>Costing Details</Card.Text>
                    </Card.Header>
                    <Card.Body>
                      <DateField label="Quotation Date" name="Date" />
                      <DateField
                        label="Expiry Date"
                        name="expiryDate"
                        required
                      />
                      <DateField
                        label="Rental Start Date"
                        name="rentStartDate"
                        required
                      />
                      <DateField
                        label="Rental End Date"
                        name="rentEndDate"
                        required
                      />
                      <FormLabel>Rental Duration</FormLabel>
                      <input className="form-control" disabled />
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Text>Rental Sum</Card.Text>
                    </Card.Header>
                    <Card.Body>
                      <TextField
                        label="Total Rental Sum"
                        name="rentSum"
                        required
                      />
                      <FormGroup>
                        <FormLabel>Total Additional Cost</FormLabel>
                        <input className="form-control" disabled />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Total Amount</FormLabel>
                        <input className="form-control" disabled />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Total Number Of Vehicles</FormLabel>
                        <input className="form-control" disabled />
                      </FormGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card>
                    <Card.Header>
                      Cost Details
                      <Card.Text className="text-right">
                        <Button>
                          <Fontawesome name="fas fa-plus text-white" /> Add New
                          Cost Components
                        </Button>
                      </Card.Text>
                    </Card.Header>
                    <Table>
                      <thead>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Group</th>
                        <th>No Of Vehicle</th>
                        <th>Rental Sum</th>
                        <th>Total</th>
                        <th></th>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Nissan</td>
                          <td>Sunny</td>
                          <td>G</td>
                          <td>2</td>
                          <td>100</td>
                          <td>10</td>
                          <td>
                            <>
                              <Button size="sm" variant="secondary">
                                {" "}
                                <Fontawesome name="fas fa-eye text-white" />
                              </Button>
                              <Button size="sm" variant="success">
                                {" "}
                                <Fontawesome name="fas fa-edit text-white" />
                              </Button>
                              <Button size="sm" variant="danger">
                                {" "}
                                <Fontawesome name="fas fa-trash-can text-white" />
                              </Button>
                            </>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-center">
              <SubmitBtn title="Create" />
            </Card.Footer>
          </Card>
        )}
      </Formik>
    </>
  );
}
