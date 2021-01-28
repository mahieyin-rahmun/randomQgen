import { Box, Button, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React, { useState } from "react";
import { IFormValues, IQuestionHolder } from "../../../utils/types";
import {
  addQuestionNodesToDOM,
  removeQuestionNodesFromDOM,
} from "../../../utils/utilities";
import AddQuestionPdf from "../../AddQuestionPdf";

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    box: {
      overflow: "hidden"
    }
  })
);

type TProps = {
  values: IFormValues,
  setValues: (
    values: React.SetStateAction<IFormValues>,
    shouldValidate?: boolean
  ) => void;
};

function PdfChooserForm(props: TProps) {
  const { values, setValues } = props;
  const [questionCount, setQuestionCount] = useState(0);
  const [questionHolderArray, setQuestionHolderArray] = useState<
    IQuestionHolder[]
  >(values.questionHolder);
   
  const isMultiPage = values.isMultiPage === "yes";
  const classes = useStyles();

  const addQuestionHolder = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    addQuestionNodesToDOM(
      questionCount,
      setQuestionCount,
      questionHolderArray,
      setQuestionHolderArray,
      values,
      setValues
    );
  };

  const handleFileUpload = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    // get the current question holder object
    let questionHolderObj = questionHolderArray[index];
    questionHolderObj = {
      ...questionHolderObj,
      file: isMultiPage ? event.target.files : event.target.files[0],
    };

    // spread the existing question holder array
    let updatedQuestionHolderArray = [...questionHolderArray];
    // update the index
    updatedQuestionHolderArray[index] = questionHolderObj;
    setQuestionHolderArray(updatedQuestionHolderArray);

    setValues(
      {
        ...values,
        questionHolder: updatedQuestionHolderArray,
      },
      true
    );
  };

  const handleRemoveFileClick = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    removeQuestionNodesFromDOM(
      index,
      questionHolderArray,
      setQuestionCount,
      setQuestionHolderArray,
      values,
      setValues
    );
  };

  return (
    <React.Fragment>
      <Button 
        variant="outlined" 
        color="primary" 
        onClick={addQuestionHolder}
        disabled={!(questionHolderArray.length < 15)}>
        Add Question PDFs
      </Button>

      <Box className={classes.box} pt={3}>
        <Grid container spacing={3} direction="column" alignContent="center">
          {questionHolderArray.map((questionHolder, index) => (
            <Grid item xs={12} key={index}>
              <AddQuestionPdf
                index={index}
                multiple={isMultiPage}
                questionHolder={questionHolder}
                handleFileUpload={handleFileUpload}
                handleRemoveFileClick={handleRemoveFileClick}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default PdfChooserForm;
