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
import ViewQuotationalDetailMODEL from "./ViewQuotationalDetailMODEL";

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
  { id: 0, serviceName: "Baby Seat", status: false, total: "", quantity: "" },
  { id: 0, serviceName: "Wifi", status: false, total: "", quantity: "" },
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
  details: Yup.array().label("Details"),
  date: Yup.date(),
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
    date: new Date(),
  });
  const [quotationDetail, setQuotationDetail] = useState({
    id: 0,
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
  const [showView, setShowView] = useState(false);
  const [branches, setBranches] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [components, setComponents] = useState([
    { id: 0, serviceName: "Accessories", status: false, amount: "" },
    { id: 0, serviceName: "Presel fuel", status: false, amount: "" },
    { id: 0, serviceName: "Collection", status: false, amount: "" },
    { id: 0, serviceName: "Delivery", status: false, amount: "" },
    { id: 0, serviceName: "SCDW", status: false, amount: "" },
    { id: 0, serviceName: "WS", status: false, amount: "" },
  ]);
  const [accessories, setAccessories] = useState([
    {
      id: 0,
      serviceName: "Baby Seat",
      status: false,
      total: "",
      quantity: "",
    },
    { id: 0, serviceName: "Wifi", status: false, total: "", quantity: "" },
    { id: 0, serviceName: "ADI", status: false, total: "", quantity: "" },
  ]);
  const [updatedDetail, setUpdatedDetail] = useState({});

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
          s.total = service.total ? parseInt(service.total) : "";
          s.quantity = service.quantity ? parseInt(service.quantity) : "";

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
            s.total = s.total ? parseInt(s.total) : "";
            s.quantity = s.quantity ? parseInt(s.quantity) : "";

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
    setQuotationDetail({
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
    setAccessories([
      {
        id: 0,
        serviceName: "Baby Seat",
        status: false,
        total: "",
        quantity: "",
      },
      { id: 0, serviceName: "Wifi", status: false, total: "", quantity: "" },
      { id: 0, serviceName: "ADI", status: false, total: "", quantity: "" },
    ]);
    setComponents([
      { id: 0, serviceName: "Accessories", status: false, amount: "" },
      { id: 0, serviceName: "Presel fuel", status: false, amount: "" },
      { id: 0, serviceName: "Collection", status: false, amount: "" },
      { id: 0, serviceName: "Delivery", status: false, amount: "" },
      { id: 0, serviceName: "SCDW", status: false, amount: "" },
      { id: 0, serviceName: "WS", status: false, amount: "" },
    ]);

    if (
      values["expiryDate"] &&
      values["rentStartDate"] &&
      values["rentEndDate"]
    ) {
      return setShow(true);
    } else {
      setFieldTouched("expiryDate");
      setFieldTouched("rentStartDate");
      setFieldTouched("rentEndDate");
    }
  };
  const handleUpdateDetail = (detail) => {
    const services = [...detail.services?.map((s) => s.serviceName)];
    const accessData = [
      ...accessoriesData.map((a) => {
        a.status = false;
        a.quantity = "";
        a.total = "";

        return a;
      }),
    ];
    const compoData = [
      ...componentsData.map((c) => {
        c.status = false;
        c.amount = "";

        return c;
      }),
    ];

    setAccessories([
      ...accessData.map((a) => {
        if (services.includes(a.serviceName)) {
          a.status = true;
          a.total = detail?.services?.find(
            (s) => s.serviceName === a.serviceName
          ).total;
          a.quantity = detail?.services?.find(
            (s) => s.serviceName === a.serviceName
          ).quantity;
        }
        return a;
      }),
    ]);
    setComponents([
      ...compoData.map((c) => {
        if (services.includes(c.serviceName)) {
          c.amount = detail?.services?.find(
            (s) => s.serviceName === c.serviceName
          ).amount;
          c.status = true;
        }
        return c;
      }),
    ]);
    setUpdatedDetail(detail);
    handleDeleteDetail(detail);
    setQuotationDetail(detail);
    setShow(true);
  };
  const handleViewDetail = (detail) => {
    setQuotationDetail(detail);
    setShowView(true);
  };
  const handleDeleteDetail = (detail) => {
    const data = [...quotation.details];
    const index = data.indexOf(detail);
    data.splice(index, 1);

    setQuotation({ ...quotation, details: data });
  };
  const handleDateDifference = (input1, input2) => {
    let date1 = new Date(input1);
    let date2 = new Date(input2);

    if (!input1 || !input2) return "";

    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Difference_In_Days + 1 + " Days";
  };
  const handleAdditionalCost = (details) => {
    try {
      if (details.length > 0) {
        const sum = [
          ...details?.map((d) =>
            d.services
              .map((s) => {
                if (s.total) {
                  s.amount = s.total * s.quantity;

                  return s;
                }

                s.amount = parseInt(s.amount);
                return s;
              })
              .map((s) => s.amount)
              ?.reduce((a, b) => a + b)
          ),
        ]?.reduce((a, b) => a + b);

        return sum;
      }
    } catch (error) {}
  };
  const handleTotalVehicles = (details) => {
    try {
      return details.map((d) => d.numberOfVehicles)?.reduce((a, b) => a + b);
    } catch (error) {}
  };
  const handleTotalCost = (details, rentPerVehicle) => {
    try {
      const totalAdditionalCosts = handleAdditionalCost(details);
      const numberOfVehicles = handleTotalVehicles(details);

      if (totalAdditionalCosts && numberOfVehicles && rentPerVehicle) {
        return numberOfVehicles * rentPerVehicle + totalAdditionalCosts;
      }

      return "";
    } catch (error) {}
  };
  const handleCloseDetail = () => {
    if (
      updatedDetail.make &&
      updatedDetail.model &&
      updatedDetail.numberOfVehicles &&
      updatedDetail.group
    ) {
      handleAddCostComponent(updatedDetail);
      setUpdatedDetail({});
    }
    setShow(false);
  };
  const handleSubmit = (values) => {
    const data = { ...values, details: quotation.details };
    data.details.map((d) => {
      d.services.map((s) => {
        if (s.total) {
          s.amount = 0;

          return s;
        }

        s.total = 0;
        s.quantity = 0;
      });

      d.id = 0;

      return d;
    });
    console.log(data);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <Formik
      initialValues={quotation}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {({ values, setFieldTouched }) => (
        <>
          <ViewQuotationalDetailMODEL
            show={showView}
            values={values}
            setShow={setShowView}
            rentalSum={values["rentSum"]}
            quotationDetail={quotationDetail}
          />
          <QuotationDetailModel
            show={show}
            setShow={setShow}
            components={components}
            accessories={accessories}
            rentalSum={values["rentSum"]}
            setComponents={setComponents}
            setAccessories={setAccessories}
            quotationDetail={quotationDetail}
            handleAddService={handleAddService}
            handleCloseModel={handleCloseDetail}
            handleUpdateService={handleUpdateService}
            quotationDetailSchema={quotationDetailSchema}
            handleAddCostComponent={handleAddCostComponent}
          />
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
                      <DateField label="Quotation Date" name="date" />
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
                      <input
                        className="form-control"
                        value={handleDateDifference(
                          values["rentStartDate"],
                          values["rentEndDate"]
                        )}
                        disabled
                      />
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
                        <input
                          className="form-control"
                          value={handleAdditionalCost(quotation.details)}
                          disabled
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Total Amount</FormLabel>
                        <input
                          className="form-control"
                          value={handleTotalCost(
                            quotation.details,
                            values["rentSum"]
                          )}
                          disabled
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Total Number Of Vehicles</FormLabel>
                        <input
                          className="form-control"
                          value={handleTotalVehicles(quotation.details)}
                          disabled
                        />
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
                            <tr key={d.model}>
                              <td>{d.make}</td>
                              <td>{d.model}</td>
                              <td>{d.group}</td>
                              <td>{d.numberOfVehicles}</td>
                              <td>{values["rentSum"]}</td>
                              <td>{values["rentSum"] * d.numberOfVehicles}</td>
                              <td>
                                <>
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => handleViewDetail(d)}
                                  >
                                    {" "}
                                    <FontAwesome name="fas fa-eye text-white" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="success"
                                    onClick={() => handleUpdateDetail(d)}
                                  >
                                    {" "}
                                    <FontAwesome name="fas fa-edit text-white" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => handleDeleteDetail(d)}
                                  >
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
              <SubmitBtn
                title="Create"
                disabled={quotation.details.length === 0}
              />
            </Card.Footer>
          </Card>
        </>
      )}
    </Formik>
  );
}
