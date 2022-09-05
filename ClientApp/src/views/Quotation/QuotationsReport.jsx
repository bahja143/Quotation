import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { MDBDataTableV5 } from "mdbreact";

import quotationsApi from "../../api/quotationsApi";

export default function QuotationsReport() {
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

  const handleLoad = async () => {
    const response = await quotationsApi.getReport();

    if (response.ok) return setQuotations(response.data);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <Card>
      <Card.Header>
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
              custom.actions = custom.status ? (
                <span className="badge badge-success">Approved</span>
              ) : (
                <span className="badge badge-danger">Pending</span>
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
