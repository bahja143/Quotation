import { Formik } from "formik";
import { Modal, Button } from "react-bootstrap";

import { TextField, SelectField, SubmitBtn } from "../../components/Form";

const NewBranchModel = ({
  show,
  setShow,
  branch,
  companies,
  schema,
  handleSubmit,
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={branch}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {() => (
        <>
          <Modal show={show}>
            <Modal.Header>
              <Modal.Title>
                {branch.id === 0 ? "New Branch" : "Update Branch"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TextField name="name" label="Name" required />
              <SelectField
                name="companyId"
                label="Company"
                options={companies?.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
                required
              />
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

export default NewBranchModel;
