import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MDBDataTableV5 } from "mdbreact";
import { Card, Button } from "react-bootstrap";
import Fontawesome from "react-fontawesome";
import * as Yup from "yup";

import NewCompanyModel from "./NewCompanyModel";
import companiesApi from "../../api/companiesApi";
import customersApi from "../../api/customersApi";

const schema = Yup.object({
  id: Yup.number(),
  name: Yup.string().min(5).max(50).required().label("Name"),
  customerId: Yup.string().required().label("Customer"),
  email: Yup.string().email().label("Email"),
  country: Yup.string().label("Country"),
  address: Yup.string().label("Address"),
  date: Yup.date().label("Date"),
});

const Companies = () => {
  const [show, setShow] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState({
    id: 0,
    name: "",
    customerId: "",
    email: "",
    country: "",
    address: "",
    date: "",
  });
  const [customers, setCustomers] = useState([]);
  const [tableHeaders] = useState([
    { label: "Name", field: "name" },
    { label: "Customer", field: "customerName" },
    { label: "Email", field: "email" },
    { label: "Country", field: "country" },
    { label: "", field: "edit" },
  ]);

  const handleLoad = async () => {
    const response = await companiesApi.getAll();
    const response1 = await customersApi.getAll();

    if (response.ok) setCompanies(response.data);
    if (response1.ok) setCustomers(response1.data);
  };
  const handleSubmit = async (company, { resetForm }) => {
    resetForm();
    setShow(false);

    if (company.id === 0) {
      const response = await companiesApi.add({ ...company, date: new Date() });

      if (response.ok) {
        toast.success("Successful Registred.");
        setShow(false);
        return setCompanies([response.data, ...companies]);
      }

      toast.error("Something went wrong");
    } else {
      const obj = { ...company };
      delete obj.customer;
      const response = await companiesApi.update(company.id, obj);

      if (response.ok) {
        toast.info("Successful Updates.");
        setShow(false);
        return setCompanies([
          response.data,
          ...companies.filter((u) => u.id !== company.id),
        ]);
      }
      toast.error("Something went wrong");
    }
  };
  const handleEdit = (custom) => {
    const cust = { ...custom };
    delete cust.edit;
    setCompany(cust);
    setShow(true);
  };
  const handleShow = () => {
    setCompany({
      id: 0,
      name: "",
      customerId: "",
      email: "",
      country: "",
      address: "",
      date: "",
      password: "",
    });
    setShow(true);
  };

  useEffect(() => {
    handleLoad();
  }, [company]);

  return (
    <>
      <NewCompanyModel
        show={show}
        setShow={setShow}
        company={company}
        customers={customers}
        schema={schema}
        handleSubmit={handleSubmit}
      />
      <Card>
        <Card.Header>
          <Button className="float-right" onClick={handleShow}>
            <Fontawesome name="fas fa-plus-circle text-white" /> New Company
          </Button>
          <Card.Title>Companies</Card.Title>
        </Card.Header>
        <Card.Body>
          <MDBDataTableV5
            hover
            entriesOptions={[10, 25, 50, 100, 250, 500, 1000]}
            entries={10}
            pagesAmount={10}
            data={{
              columns: tableHeaders,
              rows: companies.map((custom) => {
                custom.edit = (
                  <Button
                    onClick={() => handleEdit(custom)}
                    className="btn-light btn-sm"
                  >
                    <Fontawesome
                      className="fas fa-edit text-primary"
                      style={{ fontSize: 17 }}
                      name="edit"
                    />
                  </Button>
                );
                custom.customerName = custom.customer?.name;
                return custom;
              }),
            }}
            pagingTop
            searchTop
            searchBottom={false}
            fullPagination
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default Companies;
