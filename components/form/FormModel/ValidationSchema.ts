import * as Yup from "yup";
import formModel from "./FormModel";
const {
  formField: {
    isMultiPage,
    numberOfStudents,
    studentIdTextFile,
    questionHolder,
    facultyInitial,
    semester,
  },
} = formModel;

export default [
  Yup.object().shape({
    [isMultiPage.name]: Yup.string()
      .required()
      .test(
        "yesOrNo",
        isMultiPage.requiredErrorMessage,
        (val) => val && val.length > 0,
      ),
    [numberOfStudents.name]: Yup.number()
      .required(`${numberOfStudents.requiredErrorMessage}`)
      .test(
        "range",
        numberOfStudents.invalidErrorMessage,
        (val) => val >= 8 && val <= 50,
      ),
    [studentIdTextFile.name]: Yup.object().nullable(),
    [facultyInitial.name]: Yup.string()
      .nullable()
      .test("facultyInitial", facultyInitial.invalidErrorMessage, (value) => {
        // faculty initial regex: ^[a-zA-Z]+\d{0,1}$
        return value && value.match(/^[a-zA-Z]+\d{0,1}$/) !== null;
      }),
    [semester.name]: Yup.string()
      .nullable()
      .test("semester", semester.invalidErrorMessage, (value) => {
        // semester name regex: ^(Summer|Spring|Fall)\s\d{4}$
        return value && value.match(/^(Summer|Spring|Fall)\s\d{4}$/) !== null;
      }),
  }),
  Yup.object().shape({
    [questionHolder.name]: Yup.array()
      .required()
      .test(
        "length",
        questionHolder.invalidErrorMessage,
        (value) => value.length >= 2 && value.length <= 15,
      ),
  }),
];
