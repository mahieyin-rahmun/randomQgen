import React, { useState } from "react";
import { IQuestionHolderProps, TFormModel } from "../../../utils/types";

import {
  createStyles,
  Grid,
  Box,
  makeStyles,
  Theme,
  Typography,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import { Field } from "formik";
import { Select, TextField, SimpleFileUpload } from "formik-material-ui";
import PDFFooterForm from "./PDFFooterForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formcontrol: {
      margin: theme.spacing(2),
      minWidth: "75%",
      padding: theme.spacing(1, 0, 0, 0),
    },
    inputlabel: {
      fontSize: "1rem",
      padding: theme.spacing(0, 0, 10, 0),
    },
    selectfield: {
      textAlign: "left",
    },
  }),
);
function QuestionFormatParameters(props: IQuestionHolderProps) {
  const [includeFooter, setIncludeFooter] = useState<boolean>(false);
  const {
    formValues,
    formModel: {
      formField: { isMultiPage, numberOfStudents },
    },
    setValues,
  } = props;
  const { formModel } = props;

  const classes = useStyles();

  const handleStudentIdTextFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValues(
      {
        ...formValues,
        studentIdTextFile: event.target.files[0],
      },
      true,
    );
  };

  const handleIncludeFooterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    setIncludeFooter(checked);

    if (checked) {
      setValues({
        ...formValues,
        containsFooterInfo: checked,
      });
    } else {
      // if user chose to not include footer information, make sure to nullify all other information related to footer
      setValues({
        ...formValues,
        containsFooterInfo: checked,
        facultyInitial: "",
        semester: "",
        studentIdTextFile: undefined,
      });
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6">Question Format Parameters</Typography>

      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        p={1}
        ml="20%"
      >
        <Grid container spacing={2} direction="column">
          <Grid item container md={12} justify="flex-start">
            <FormControl className={classes.formcontrol}>
              <InputLabel
                htmlFor={isMultiPage.name}
                className={classes.inputlabel}
              >
                {isMultiPage.label}
              </InputLabel>
              <Field
                component={Select}
                name={isMultiPage.name}
                className={classes.selectfield}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Field>
            </FormControl>
          </Grid>

          <Grid item container md={12} justify="flex-start">
            <FormControl className={classes.formcontrol}>
              <Field
                component={TextField}
                label={numberOfStudents.label}
                type="number"
                name={numberOfStudents.name}
              />
            </FormControl>
          </Grid>

          <Grid
            item
            container
            md={12}
            justify="flex-start"
            style={{ marginLeft: "15px" }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={includeFooter || formValues.containsFooterInfo}
                  onChange={handleIncludeFooterChange}
                  name="includeFooter"
                  color="default"
                />
              }
              label="Include footer in the generated PDF?"
            />
          </Grid>

          {(includeFooter || formValues.containsFooterInfo) && (
            <PDFFooterForm
              classes={classes}
              formModel={formModel}
              formValues={formValues}
              setValues={setValues}
              handleStudentIdTextFileSelect={handleStudentIdTextFileSelect}
            />
          )}
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default QuestionFormatParameters;
