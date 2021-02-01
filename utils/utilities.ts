import React from "react";
import { IFormValues, IQuestionHolder } from "./types";

export const addQuestionNodesToDOM = (
  questionCount: number, 
  setQuestionCount: React.Dispatch<React.SetStateAction<number>>,
  questionHolderArray: IQuestionHolder[],
  setQuestionHolderArray: React.Dispatch<React.SetStateAction<IQuestionHolder[]>>,
  values: IFormValues,
  setValues: (values: React.SetStateAction<IFormValues>, shouldValidate?: boolean) => void
  ) => {
    /*
      A generic method to update the QuestionHolder array for both single page
      and multi page modes
    */
    const updatedQuestionCount = questionCount + 1;
    const questionHolderObj = {
      name: `question${updatedQuestionCount}`,
      title: `Question ${updatedQuestionCount}`,
    };

    setQuestionCount(updatedQuestionCount);
    
    // update question holder array in state
    let updatedQuestionHolderArray = [...questionHolderArray];
    updatedQuestionHolderArray.push(questionHolderObj);
    setQuestionHolderArray(updatedQuestionHolderArray);

    setValues({
      ...values,
      questionHolder: updatedQuestionHolderArray
    }, true);
};

export const removeQuestionNodesFromDOM = (
  index: number,
  questionHolderArray: IQuestionHolder[],
  setQuestionCount: React.Dispatch<React.SetStateAction<number>>,
  setQuestionHolderArray: React.Dispatch<React.SetStateAction<IQuestionHolder[]>>,
  values: IFormValues,
  setValues: (values: React.SetStateAction<IFormValues>, shouldValidate?: boolean) => void
) => {
  const updatedQuestionHolderArray = [...questionHolderArray]
    updatedQuestionHolderArray.splice(index, 1);
    const updatedQuestionCount = updatedQuestionHolderArray.length;
    
    // adjust title and name so that removing from any arbitrary position does not result
    // in out of order name and title
    updatedQuestionHolderArray.map((questionHolder, index) => {
      questionHolder.name = `question${index + 1}`;
      questionHolder.title = `Question ${index + 1}`;
    });

    setQuestionHolderArray(updatedQuestionHolderArray);
    setQuestionCount(updatedQuestionCount);
    setValues({
      ...values,
      questionHolder: updatedQuestionHolderArray
    }, true);
};