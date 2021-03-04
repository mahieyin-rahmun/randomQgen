import React, { useState } from "react";
import {
  Step,
  Stepper,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Formik, Form, FormikHelpers } from "formik";
import axios from "axios";
import fileDownload from "js-file-download";

import formModel from "./FormModel/FormModel";
import { initialValues } from "./FormModel/InitialValues";
import validationSchema from "./FormModel/ValidationSchema";
import QuestionFormatParameters from "./components/QuestionFormatParameters";
import QuestionHolder from "./components/QuestionHolder";
import Finalize from "./components/Finalize";
import { IFormValues } from "../../utils/types";
import AlertComponent from "../AlertComponent";
import { GENERATE_PDF_ENDPOINT, makeUrl } from "../../utils/backend";

const { formId } = formModel;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    stepper: {
      padding: theme.spacing(5, 20, 5, 20),
    },
    button: {
      margin: theme.spacing(0, 2, 0),
    },
    buttonDiv: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
  }),
);

const renderStepContent = (
  activeStep: number,
  values: IFormValues,
  setValues: (
    values: React.SetStateAction<IFormValues>,
    shouldValidate?: boolean,
  ) => void,
) => {
  switch (activeStep) {
    case 0:
      return (
        <QuestionFormatParameters
          formModel={formModel}
          formValues={values}
          setValues={setValues}
        />
      );
    case 1:
      return (
        <QuestionHolder
          formModel={formModel}
          formValues={values}
          setValues={setValues}
        />
      );
    case 2:
      return <Finalize formModel={formModel} formValues={values} />;
    default:
      return "Not Found";
  }
};

const steps: string[] = ["Choose Parameters", "Select PDFs", "Finalize"];

function Options() {
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  const isLastStep: boolean = activeStep === steps.length - 1;

  const submitForm = async (
    values: IFormValues,
    actions: FormikHelpers<IFormValues>,
  ) => {
    const {
      isMultiPage,
      numberOfStudents,
      questionHolder,
      containsFooterInfo,
      studentIdTextFile,
      facultyInitial,
      semester,
    } = values;
    const multiPage = isMultiPage === "yes";

    const formData = new FormData();
    formData.append("isMultiPage", isMultiPage);
    formData.append("numberOfStudents", numberOfStudents.toString());

    if (multiPage) {
      // append all the files from the choices array
      for (let index = 0; index < questionHolder.length; index++) {
        const currentQuestionPdfs = questionHolder[index];
        const fileList = currentQuestionPdfs.file as FileList;

        for (const file of fileList) {
          formData.append(`${currentQuestionPdfs.name}`, file, file.name);
        }
      }
    } else {
      for (let index = 0; index < questionHolder.length; index++) {
        const currentQuestionPdf = questionHolder[index];
        const file = currentQuestionPdf.file as File;
        formData.append(`${currentQuestionPdf.name}`, file, file.name);
      }
    }

    if (
      containsFooterInfo &&
      !(studentIdTextFile && facultyInitial && semester)
    ) {
      // error, user did not fill in all required values
      console.log(
        "You chose to include footer information but did not submit all the necessary data",
      );
    } else {
      formData.append(
        "studentIdTextFile",
        studentIdTextFile,
        studentIdTextFile.name,
      );
      formData.append("facultyInitial", facultyInitial);
      formData.append("semester", semester);
    }

    axios
      .post(makeUrl(GENERATE_PDF_ENDPOINT), formData, {
        responseType: "blob",
      })
      .then((response) => {
        fileDownload(response.data, `questions_${Date.now()}.zip`);
        actions.setSubmitting(false);
      })
      .catch((error) => {
        actions.setSubmitting(false);
        console.log("Error", error);
      });
  };

  const handleSubmit = (
    values: IFormValues,
    actions: FormikHelpers<IFormValues>,
  ) => {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  const handleBack = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div>
      <React.Fragment>
        <Typography variant="h4">Set up your paramters</Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((stepLabel, index) => (
            <Step key={index}>
              <StepLabel>{stepLabel}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema[activeStep]}
        >
          {({ values, isSubmitting, setValues, errors }) => (
            <Form id={formId}>
              {Object.keys(errors).map((errorKey) => (
                <AlertComponent message={errors[errorKey]} severity="error" />
              ))}
              {renderStepContent(activeStep, values, setValues)}
              <div className={classes.buttonDiv}>
                {activeStep !== 0 && (
                  <Button
                    onClick={handleBack}
                    variant="contained"
                    className={classes.button}
                  >
                    Back
                  </Button>
                )}

                <Button
                  disabled={
                    isSubmitting ||
                    (activeStep == 1 && values.questionHolder.length < 2)
                  }
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  {isLastStep ? "Generate Question PDFs!" : "Next"}
                </Button>

                {isSubmitting && (
                  <CircularProgress
                    size={24}
                    style={{ marginTop: "0.4rem", marginLeft: "0.5rem" }}
                  />
                )}
              </div>
              {activeStep == 1 && values.questionHolder.length < 2 && (
                <>
                  <br />
                  <Typography variant="button">
                    Select PDFs for at least 2 questions.
                  </Typography>
                </>
              )}
            </Form>
          )}
        </Formik>
      </React.Fragment>
    </div>
  );
}

export default Options;
