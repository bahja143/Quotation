import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MDBDataTableV5 } from "mdbreact";
import { Card, Button } from "react-bootstrap";
import Fontawesome from "react-fontawesome";
import * as Yup from "yup";

import NewBranchModel from "./NewBranchModel";
import branchesApi from "../../api/branchesApi";
import companiesApi from "../../api/companiesApi";

const schema = Yup.object({
  id: Yup.number(),
  name: Yup.string().min(5).max(50).required().label("Name"),
  companyId: Yup.string().required().label("Role"),
});

const Branches = () => {
  const [show, setShow] = useState(false);
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState({
    id: 0,
    name: "",
    companyId: "",
  });
  const [companies, setCompanies] = useState([]);
  const [tableHeaders] = useState([
    { label: "Name", field: "name" },
    { label: "Company", field: "companyName" },
    { label: "", field: "edit" },
  ]);

  const handleLoad = async () => {
    const response = await branchesApi.getAll();
    const response1 = await companiesApi.getAll();

    if (response.ok) setBranches(response.data);
    if (response1.ok) setCompanies(response1.data);
  };
  const handleSubmit = async (branch, { resetForm }) => {
    resetForm();
    setShow(false);

    if (branch.id === 0) {
      const response = await branchesApi.add({ ...branch, date: new Date() });

      if (response.ok) {
        toast.success("Successful Registered.");
        setShow(false);
        return setBranches([response.data, ...branches]);
      }

      toast.error("Something went wrong");
    } else {
      const response = await branchesApi.update(branch.id, {
        id: branch.id,
        name: branch.name,
        companyId: branch.companyId,
      });

      if (response.ok) {
        toast.info("Successful Updates.");
        setShow(false);
        return setBranches([
          response.data,
          ...branches.filter((u) => u.id !== branch.id),
        ]);
      }
      toast.error("Something went wrong");
    }
  };
  const handleEdit = (custom) => {
    const cust = { ...custom };
    delete cust.edit;
    setBranch(cust);
    setShow(true);
  };
  const handleShow = () => {
    setBranch({
      id: 0,
      name: "",
      companyId: "",
    });
    setShow(true);
  };

  useEffect(() => {
    handleLoad();
  }, [branch]);

  return (
    <>
      <NewBranchModel
        show={show}
        setShow={setShow}
        branch={branch}
        companies={companies}
        schema={schema}
        handleSubmit={handleSubmit}
      />
      <Card>
        <Card.Header>
          <Button className="float-right" onClick={handleShow}>
            <Fontawesome name="fas fa-plus-circle text-white" /> New Branch
          </Button>
          <Card.Title>Branches</Card.Title>
        </Card.Header>
        <Card.Body>
          <MDBDataTableV5
            hover
            entriesOptions={[10, 25, 50, 100, 250, 500, 1000]}
            entries={10}
            pagesAmount={10}
            data={{
              columns: tableHeaders,
              rows: branches.map((custom) => {
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
                custom.companyName = custom?.company?.name;
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

export default Branches;
