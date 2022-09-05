import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { MDBDataTableV5 } from "mdbreact";
import FontAwesome from "react-fontawesome";
import { useHistory } from "react-router-dom";
import JwtDecode from "jwt-decode";

import quotationsApi from "../../api/quotationsApi";

export default function Quotations() {
  const [quotations, setQuotations] = useState([]);
  const [tableHeaders] = useState([
    { label: "QTN No.", field: "id" },
    { label: "Company", field: "companyName" },
    { label: "Branch", field: "branchName" },
    { label: "No.Of Vehicles", field: "numberOfVehicles" },
    { label: "Total Amount", field: "totalAmount" },
    { label: "Expiry Date", field: "expiryDate" },
    { label: "Date", field: "date" },
    { label: "", field: "actions" },
  ]);
  const history = useHistory();
  const user = localStorage["token"] ? JwtDecode(localStorage["token"]) : null;

  const handleLoad = async () => {
    const response = await quotationsApi.getAll();

    if (response.ok) return setQuotations(response.data);
  };
  const handleApprove = (id) => {
    // setQuotations(quotations.filter((q) => q.id !== id));
    quotationsApi.approve(id);
  };
  const handleNavigate = () => {
    history.push("/quotation/form");
  };

  useEffect(() => {
    handleLoad();
  });

  return (
    <Card>
      <Card.Header>
        <Button className="float-right" onClick={handleNavigate}>
          Create
        </Button>
        <Card.Title>Quotations</Card.Title>
      </Card.Header>
      <Card.Body>
        <MDBDataTableV5
          hover
          entriesOptions={[10, 25, 50, 100, 250, 500, 1000]}
          entries={10}
          pagesAmount={10}
          data={{
            columns: tableHeaders,
            rows: quotations.map((custom) => {
              custom.actions =
                user && user?.role === "admin" ? (
                  <Button
                    className="btn-light btn-sm text-center"
                    onClick={() => handleApprove(custom.id)}
                  >
                    <FontAwesome
                      className="fa-solid fa-check-double text-success"
                      style={{ fontSize: 20 }}
                      name="check"
                    />
                  </Button>
                ) : (
                  ""
                );

              custom.date = new Date(custom.date).toDateString();
              custom.expiryDate = new Date(custom.expiryDate).toDateString();
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
  );
}
