import React from "react";
import { IQuestionHolderProps } from "../../../utils/types";
import PdfChooserForm from "./PdfChooserForm";

function QuestionHolder(props: IQuestionHolderProps) {
  const { setValues } = props;

  // const accordionText = isMultiPage === "yes" ?
  //   `You chose that your PDFs will have multi page questions. So, you need to upload separate
  //   PDFs for each questions. For example, if you have four questions you want to choose from
  //   for Question 1, and those four questions can be multiple pages, you need to upload four
  //   individual PDFs for each of the choices.` :
  //   `You chose that your PDFs will have single page questions. So, you can put all of your choices
  //   for a particular question in a single PDF, and upload that PDF. You need to repeat this for
  //   every question you want to have in your final generated PDF.`;

  return (
    <React.Fragment>
      {/* <Box pl={10} pr={10} pb={5} textAlign="justify">
        <Accordion style={{ backgroundColor: "#3a3a3a", color: "#fff" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "#fff" }}/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Instructions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {accordionText}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box> */}
      <PdfChooserForm values={props.formValues} setValues={setValues} />
    </React.Fragment>
  );
}

export default QuestionHolder;
