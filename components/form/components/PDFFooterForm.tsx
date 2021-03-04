import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  Typography,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { Field } from "formik";
import React from "react";
import { IQuestionHolderProps } from "../../../utils/types";

interface IPDFFooterFormProps extends IQuestionHolderProps {
  classes: Record<"formcontrol" | "inputlabel" | "selectfield", string>;
  handleStudentIdTextFileSelect: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

function PDFFooterForm(props: IPDFFooterFormProps) {
  const {
    classes,
    formModel: {
      formField: { studentIdTextFile, facultyInitial, semester },
    },
    formValues,
    setValues,
    handleStudentIdTextFileSelect,
  } = props;

  const handlePdfFooterDataChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValues(
      {
        ...formValues,
        [event.target.name]: event.target.value,
      },
      true,
    );
  };

  return (
    <React.Fragment>
      <Grid item container md={12} justify="flex-start">
        <FormControl className={classes.formcontrol}>
          <InputLabel
            shrink={true}
            variant="standard"
            htmlFor={studentIdTextFile.name}
          >
            {studentIdTextFile.label}
          </InputLabel>
          <Input
            type="file"
            name={studentIdTextFile.name}
            inputProps={{
              accept: ".txt",
            }}
            onChange={handleStudentIdTextFileSelect}
          />
          <Typography
            variant="caption"
            style={{ flexDirection: "row", display: "flex" }}
          >
            This will be used to set unique footers in each generated PDF.
          </Typography>
        </FormControl>
      </Grid>

      <Grid item container md={12} justify="flex-start">
        <FormControl className={classes.formcontrol}>
          <Field
            component={TextField}
            label={facultyInitial.label}
            type="text"
            name={facultyInitial.name}
            onChange={handlePdfFooterDataChange}
            value={formValues.facultyInitial}
            inputProps={{
              placeholder: "SAS3"
            }}
          />
        </FormControl>
      </Grid>

      <Grid item container md={12} justify="flex-start">
        <FormControl className={classes.formcontrol}>
          <Field
            component={TextField}
            label={semester.label}
            type="text"
            name={semester.name}
            value={formValues.semester}
            onChange={handlePdfFooterDataChange}
            inputProps={{
              placeholder: "Spring 2020"
            }}
          />
        </FormControl>
      </Grid>
    </React.Fragment>
  );
}

export default PDFFooterForm;
