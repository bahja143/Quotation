import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MDBDataTableV5 } from "mdbreact";
import { Card, Button } from "react-bootstrap";
import Fontawesome from "react-fontawesome";
import * as Yup from "yup";

import NewUserModal from "./NewUserModel";
import usersApi from "../../api/usersApi";

const schema = Yup.object({
  id: Yup.number(),
  name: Yup.string().min(5).max(50).required().label("Name"),
  role: Yup.string().required().label("Role"),
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().label("Password"),
});

const Users = () => {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    id: 0,
    name: "",
    role: "",
    username: "",
    password: "",
  });
  const [tableHeaders] = useState([
    { label: "Name", field: "name" },
    { label: "Role", field: "role" },
    { label: "Username", field: "username" },
    { label: "", field: "edit" },
  ]);

  const handleLoad = async () => {
    const response = await usersApi.getAll();

    if (response.ok) setUsers(response.data);
  };
  const handleSubmit = async (user, { resetForm }) => {
    resetForm();
    setShow(false);

    if (user.id === 0) {
      const response = await usersApi.add(user);

      if (response.ok) {
        toast.success("Successful Registred.");
        setShow(false);
        return setUsers([response.data, ...users]);
      }

      toast.error("Something went wrong");
    } else {
      const response = await usersApi.update(user.id, user);

      if (response.ok) {
        toast.info("Successful Updates.");
        setShow(false);
        return setUsers([
          response.data,
          ...users.filter((u) => u.id !== user.id),
        ]);
      }
      toast.error("Something went wrong");
    }
  };
  const handleEdit = (custom) => {
    const cust = { ...custom };
    delete cust.edit;
    setUser(cust);
    setShow(true);
  };
  const handleShow = () => {
    setUser({
      id: 0,
      name: "",
      role: "",
      username: "",
      password: "",
    });
    setShow(true);
  };

  useEffect(() => {
    handleLoad();
  }, [user]);

  return (
    <>
      <NewUserModal
        show={show}
        setShow={setShow}
        user={user}
        schema={schema}
        handleSubmit={handleSubmit}
      />
      <Card>
        <Card.Header>
          <Button className="float-right" onClick={handleShow}>
            <Fontawesome name="fas fa-plus-circle text-white" /> New User
          </Button>
          <Card.Title>Users</Card.Title>
        </Card.Header>
        <Card.Body>
          <MDBDataTableV5
            hover
            entriesOptions={[10, 25, 50, 100, 250, 500, 1000]}
            entries={10}
            pagesAmount={10}
            data={{
              columns: tableHeaders,
              rows: users.map((custom) => {
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

export default Users;
