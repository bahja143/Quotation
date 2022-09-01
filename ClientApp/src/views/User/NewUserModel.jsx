import { Formik } from "formik";
import { Modal, Button } from "react-bootstrap";

import { TextField, SelectField, SubmitBtn } from "../../components/Form";

const roles = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
];

const NewUserModal = ({ show, setShow, user, schema, handleSubmit }) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={user}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {() => (
        <>
          <Modal show={show}>
            <Modal.Header>
              <Modal.Title>
                {user.id === 0 ? "New user" : "Update user"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TextField name="name" label="Name" required />
              <SelectField name="role" label="Role" options={roles} required />
              <TextField name="username" label="Username" required />
              <TextField name="password" label="Password" required />
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => setShow(false)}
                variant="secondary"
                color="error"
              >
                Close
              </Button>
              <SubmitBtn />
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Formik>
  );
};

export default NewUserModal;
