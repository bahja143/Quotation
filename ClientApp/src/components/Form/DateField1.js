import React from "react";
import { useFormikContext } from "formik";

import { FormGroup, FormLabel } from "react-bootstrap";
import DateTime from "react-datetime";

const DateField1 = ({ name, label, required }) => {
  const { setFieldTouched, touched, errors, values, setFieldValue } =
    useFormikContext();

  return (
    <FormGroup>
      <FormLabel>
        {label} {required && <span className="text-danger">*</span>}
      </FormLabel>
      <DateTime
        onChange={(e) => setFieldValue(name, e._d)}
        onOpen={() => setFieldTouched(name)}
        value={values[name] && new Date(values[name])}
        timeFormat={false}
        closeOnSelect
      />
      {errors[name] && touched[name] ? (
        <div className="text-danger">{errors[name]}</div>
      ) : null}
    </FormGroup>
  );
};

export default DateField1;
