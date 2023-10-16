import React from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
const determineInputType = (item) => {
  if (item.includes("decimal")) return "number";
  if (item === "date") return "date";
  if (item === "datetime") return "time";
  return "text";
};

const FormComponent = ({ data, onSubmit }) => {
  const handleSubmit = async (values) => {
    try {
      const payload = {
        data: Object.entries(values).map(([field, value]) => ({
          Field: field,
          Value: value,
        })),
      };
      onSubmit(payload);
    } catch (error) {}
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="formContainer">
        {data &&
          data.map((item, index) => {
            if (item.Key === "PRI") return null;

            return (
              <div key={index}>
                <FormControl fullWidth={true}>
                  {item.Type.includes("varchar") ||
                  item.Type.includes("decimal") ||
                  item.Type.includes("date") ? (
                    <TextField
                      label={item.Field}
                      variant="outlined"
                      type={determineInputType(item.Type)}
                      name={item.Field}
                      onChange={formik.handleChange}
                      required={item.Null === "NO"}
                      value={formik.values[item.Field] || ""}
                      error={
                        formik.touched[item.Field] &&
                        Boolean(formik.errors[item.Field])
                      }
                      helperText={
                        formik.touched[item.Field]
                          ? formik.errors[item.Field]
                          : ""
                      }
                      inputProps={{
                        maxLength: item.Type.includes("varchar") ? 100 : 10,
                      }}
                    />
                  ) : item.Type === "tinyint" || item.Type === "tinytext" ? (
                    <FormControlLabel
                      style={{ marginLeft: "1rem" }}
                      control={
                        <>
                          <Typography>{item.Field}</Typography>
                          <Checkbox
                            checked={formik.values[item.Field] === "true"}
                            name={item.Field}
                            required={item.Null === "NO"}
                            onChange={(e) => {
                              formik.setFieldValue(
                                item.Field,
                                e.target.checked.toString()
                              );
                            }}
                          />
                        </>
                      }
                      label={item.Field === "true" ? "Yes" : "No"}
                    />
                  ) : null}
                </FormControl>
              </div>
            );
          })}
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FormComponent;
