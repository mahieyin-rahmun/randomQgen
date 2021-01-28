import * as Yup from "yup";
import formModel from "./FormModel";
const { 
  formField: { 
    isMultiPage, 
    numberOfStudents, 
    studentIdTextFile, 
    questionHolder 
  } 
} = formModel;

export default [
  Yup.object().shape({
    [isMultiPage.name]: Yup
                          .string()
                          .required()
                          .test(
                            "yesOrNo", 
                            isMultiPage.requiredErrorMessage,
                            val => val && val.length > 0
                            ),
    [numberOfStudents.name]: Yup
                               .number()
                               .required(`${numberOfStudents.requiredErrorMessage}`)
                               .test(
                                 'range', 
                                 numberOfStudents.invalidErrorMessage, 
                                 (val) => val >= 8 && val <= 50
                                ),
    [studentIdTextFile.name]: Yup
                                .object()
                                .nullable()
  }),
  Yup.object().shape({
    [questionHolder.name]: Yup
                             .array()
                             .required()
                             .test(
                               "length", 
                               questionHolder.invalidErrorMessage,
                               value => value.length >= 2 && value.length <= 15
                              )
            
  })
];