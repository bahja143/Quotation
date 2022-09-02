import React from "react";
import { useFormikContext } from "formik";

import { Button } from "react-bootstrap";

const SubmitBtn = ({ disabled, title = "Submit" }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <Button onClick={() => handleSubmit()} disabled={disabled}>
      {title}
    </Button>
  );
};

export default SubmitBtn;
