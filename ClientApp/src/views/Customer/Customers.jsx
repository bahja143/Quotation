import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MDBDataTableV5 } from "mdbreact";
import { Card, Button } from "react-bootstrap";

import FontAwesome from "react-fontawesome";
import * as Yup from "yup";

import NewCustomerModal from "./NewCustomerModal";
import customersApi from "../../api/customersApi";

const schema = Yup.object({
  id: Yup.number(),
  name: Yup.string().min(5).max(50).required().label("Name"),
  telephone: Yup.string().required().label("Telephone"),
  category: Yup.string().required().label("Category"),
  email: Yup.string().email().label("Email"),
  nationality: Yup.string().label("Nationality"),
  identityType: Yup.string().label("Id Type"),
  identityId: Yup.string().label("Id"),
  identityIssueDate: Yup.string().label("Id Issue Date"),
  identityExpiryDate: Yup.string().label("Id Expiry Date"),
});

const Customers = () => {
  const [show, setShow] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({
    id: 0,
    name: "",
    email: "",
    telephone: "",
    category: "",
    nationality: "",
    identityType: "",
    identityId: "",
    identityIssueDate: "",
    identityExpiryDate: "",
  });
  const [tableHeaders] = useState([
    { label: "Name", field: "name" },
    { label: "Telephone", field: "telephone" },
    { label: "Category", field: "category" },
    { label: "Nationality", field: "nationality" },
    { label: "", field: "edit" },
  ]);

  const handleLoad = async () => {
    const response = await customersApi.getAll();

    if (response.ok) setCustomers(response.data);
  };
  const handleSubmit = async (customer, { resetForm }) => {
    resetForm();
    setShow(false);

    if (customer.id === 0) {
      const response = await customersApi.add({
        ...customer,
        date: new Date(),
      });

      if (response.ok) {
        toast.success("Successful Registered.");
        setShow(false);
        return setCustomers([response.data, ...customers]);
      }

      toast.error("Something went wrong");
    } else {
      const response = await customersApi.update(customer.id, customer);

      if (response.ok) {
        toast.info("Successful Updates.");
        setShow(false);
        return setCustomers([
          response.data,
          ...customers.filter((c) => c.id !== customer.id),
        ]);
      }
      toast.error("Something went wrong");
    }
  };
  const handleEdit = (custom) => {
    const cust = { ...custom };
    delete cust.edit;
    setCustomer(cust);
    setShow(true);
  };
  const handleShow = () => {
    setCustomer({
      id: 0,
      name: "",
      email: "",
      telephone: "",
      category: "",
      nationality: "",
      identityType: "",
      identityId: "",
      identityIssueDate: "",
      identityExpiryDate: "",
    });
    setShow(true);
  };

  useEffect(() => {
    handleLoad();
  }, [customer]);

  return (
    <>
      <NewCustomerModal
        show={show}
        setShow={setShow}
        customer={customer}
        schema={schema}
        handleSubmit={handleSubmit}
      />
      <Card>
        <Card.Header>
          <Button className="float-right" onClick={handleShow}>
            <FontAwesome name="fas fa-plus-circle text-white" /> New Customer
          </Button>
          <Card.Title>Customers</Card.Title>
        </Card.Header>
        <Card.Body>
          <MDBDataTableV5
            hover
            entriesOptions={[10, 25, 50, 100, 250, 500, 1000]}
            entries={10}
            pagesAmount={10}
            data={{
              columns: tableHeaders,
              rows: customers.map((custom) => {
                custom.edit = (
                  <Button
                    onClick={() => handleEdit(custom)}
                    className="btn-light btn-sm"
                  >
                    <FontAwesome
                      className="fas fa-edit text-primary"
                      style={{ fontSize: 17 }}
                      name="edit"
                    />
                  </Button>
                );
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

export default Customers;
