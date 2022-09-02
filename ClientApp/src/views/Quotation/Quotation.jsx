import { useState, useEffect } from "react";
import { Formik } from "formik";
import FontAwesome from "react-fontawesome";

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
const componentsData = [
  { id: 0, serviceName: "Accessories", status: false, amount: "" },
  { id: 0, serviceName: "Presel fuel", status: false, amount: "" },
  { id: 0, serviceName: "Collection", status: false, amount: "" },
  { id: 0, serviceName: "Delivery", status: false, amount: "" },
  { id: 0, serviceName: "SCDW", status: false, amount: "" },
  { id: 0, serviceName: "WS", status: false, amount: "" },
];
const accessoriesData = [
  { id: 0, serviceName: "Baby Seat", status: false, amount: "", quantity: "" },
  { id: 0, serviceName: "Wifi", status: false, amount: "", quantity: "" },
  { id: 0, serviceName: "ADI", status: false, total: "", quantity: "" },
];

const schema = Yup.object({
  id: Yup.number(),
  category: Yup.string().label("Category"),
  companyId: Yup.number().required().label("Company"),
  branchId: Yup.number().required().label("Branch"),
  debitorId: Yup.number().required().label("Debitor"),
  expiryDate: Yup.date().required().label("Expiry date"),
  rentStartDate: Yup.date().required().label("Rental start date"),
  rentEndDate: Yup.date()
    .when(
      "rentStartDate",
      (rentStartDate, yup) =>
        rentStartDate &&
        yup.min(rentStartDate, "Rent end date cannot be before rent start date")
    )
    .required()
    .label("Rental end date"),
  rentSum: Yup.number().required().label("Rental sum"),
  details: Yup.array().min(1).label("Detail"),
  date: Yup.date().required().label("Date"),
});
const quotationDetailSchema = Yup.object({
  id: Yup.number(),
  make: Yup.string().required().label("Make"),
  model: Yup.string().required().label("Model"),
  group: Yup.string().required().label("Group"),
  remark: Yup.string().label("Remark"),
  Services: Yup.array().label("Services"),
  checkInLocation: Yup.string().required().label("Check In Location"),
  checkOutLocation: Yup.string().required().label("Check Out Location"),
  numberOfVehicles: Yup.number().required().label("Number Of Vehicles"),
});

export default function Quotation() {
  const [quotation, setQuotation] = useState({
    id: 0,
    category: "",
    companyId: "",
    branchId: "",
    debitorId: "",
    expiryDate: "",
    rentStartDate: "",
    rentEndDate: "",
    rentSum: "",
    details: [],
    date: "",
  });
  const [quotationDetail, setQuotationDetail] = useState({
    id: "",
    make: "",
    model: "",
    group: "",
    remark: "",
    services: [],
    checkInLocation: "",
    checkOutLocation: "",
    numberOfVehicles: "",
  });
  const [show, setShow] = useState(false);
  const [branches, setBranches] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [components, setComponents] = useState(componentsData);
  const [accessories, setAccessories] = useState(accessoriesData);

  const handleLoad = async () => {
    const response = await companyApi.getAll();
    const response1 = await branchesApi.getAll();
    const response2 = await customersApi.getAll();

    if (response.ok) setCompanies(response.data);
    if (response1.ok) setBranches(response1.data);
    if (response2.ok) setCustomers(response2.data);
  };
  const handleUpdateService = (service) => {
    const data = { ...quotationDetail };

    if (data.services.find((s) => s.serviceName === service.serviceName)) {
      data.services.map((s) => {
        if (s.serviceName === service.serviceName) {
          s.amount = service.amount;

          return s;
        }
        return s;
      });
    }

    setQuotationDetail({ ...data });
  };
  const handleAddService = (service) => {
    const data = { ...quotationDetail };

    if (service.status) {
      if (data.services.find((s) => s.serviceName === service.serviceName)) {
        data.services.map((s) => {
          if (s.serviceName === service.serviceName) {
            s.amount = service.amount;

            return s;
          }
          return s;
        });

        setQuotationDetail({ ...data });
      } else {
        data.services.push(service);
      }
    } else {
      data.services = data.services.filter(
        (s) => s.serviceName !== service.serviceName
      );
      setQuotationDetail({ ...data });
    }
  };
  const handleAddCostComponent = (values) => {
    setQuotation({
      ...quotation,
      details: [...quotation.details, values],
    });
    setShow(false);
  };
  const handleShowDetail = (setFieldTouched, values) => {
    setFieldTouched("expiryDate");
    setFieldTouched("rentStartDate");
    setFieldTouched("rentEndDate");

    if (
      values["expiryDate"] &&
      values["rentStartDate"] &&
      values["rentEndDate"]
    )
      return setShow(true);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <QuotationDetailModel
        show={show}
        setShow={setShow}
        components={components}
        accessories={accessories}
        setComponents={setComponents}
        setAccessories={setAccessories}
        componentsData={componentsData}
        quotationDetail={quotationDetail}
        handleAddService={handleAddService}
        handleUpdateService={handleUpdateService}
        quotationDetailSchema={quotationDetailSchema}
        handleAddCostComponent={handleAddCostComponent}
      />
      <Formik initialValues={quotation} validationSchema={schema}>
        {({ values, setFieldTouched }) => (
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
                        <Button
                          onClick={() =>
                            handleShowDetail(setFieldTouched, values)
                          }
                        >
                          <FontAwesome name="fas fa-plus text-white" /> Add New
                          Cost Components
                        </Button>
                      </Card.Text>
                    </Card.Header>
                    {quotation.details?.length > 0 && (
                      <Table>
                        <thead>
                          <tr>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Group</th>
                            <th>No Of Vehicle</th>
                            <th>Rental Sum</th>
                            <th>Total</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {quotation.details?.map((d) => (
                            <tr>
                              <td>{d.make}</td>
                              <td>{d.model}</td>
                              <td>{d.group}</td>
                              <td>{d.numberOfVehicles}</td>
                              <td>{values["rentSum"]}</td>
                              <td>{values["rentSum"] * d.numberOfVehicles}</td>
                              <td>
                                <>
                                  <Button size="sm" variant="secondary">
                                    {" "}
                                    <FontAwesome name="fas fa-eye text-white" />
                                  </Button>
                                  <Button size="sm" variant="success">
                                    {" "}
                                    <FontAwesome name="fas fa-edit text-white" />
                                  </Button>
                                  <Button size="sm" variant="danger">
                                    {" "}
                                    <FontAwesome name="fas fa-trash-can text-white" />
                                  </Button>
                                </>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
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
