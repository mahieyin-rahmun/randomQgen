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

function parseTextFile(studentIdTextFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      let textFileData = event.target.result;
      let studentIdList = textFileData.toString().split("\n");
      resolve(studentIdList.length);
    };
    reader.readAsText(studentIdTextFile);
  });
}

export default [
  Yup.object().shape({
    containsFooterInfo: Yup.boolean(),
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
    [studentIdTextFile.name]: Yup.mixed().when("containsFooterInfo", {
      is: true,
      then: Yup.mixed()
        .defined(studentIdTextFile.requiredErrorMessage)
        .test("presence", studentIdTextFile.requiredErrorMessage, (value) => {
          return value instanceof File;
        })
        .test(
          "matchNumberOfStudents",
          studentIdTextFile.invalidErrorMessage,
          async function (value) {
            if (value instanceof File) {
              const numberOfStudentIdsInTextFile = await parseTextFile(value);
              const numberOfStudentsSpecified = this.parent.numberOfStudents;

              return numberOfStudentIdsInTextFile === numberOfStudentsSpecified;
            }

            return false;
          },
        ),
      otherwise: Yup.mixed().notRequired(),
    }),
    [facultyInitial.name]: Yup.string().when("containsFooterInfo", {
      is: true,
      then: Yup.string()
        .required(facultyInitial.requiredErrorMessage)
        .test("facultyInitial", facultyInitial.invalidErrorMessage, (value) => {
          // faculty initial regex: ^[a-zA-Z]+\d{0,1}$
          return value && value.match(/^[a-zA-Z]+\d{0,1}$/) !== null;
        }),
      otherwise: Yup.string().notRequired(),
    }),
    [semester.name]: Yup.string().when("containsFooterInfo", {
      is: true,
      then: Yup.string()
        .required(semester.requiredErrorMessage)
        .test("semester", semester.invalidErrorMessage, (value) => {
          // semester name regex: ^(Summer|Spring|Fall)\s\d{4}$
          return value && value.match(/^(Summer|Spring|Fall)\s\d{4}$/) !== null;
        }),
      otherwise: Yup.string().nullable(true),
    }),
  }),
  Yup.object().shape({
    [questionHolder.name]: Yup.array()
      .required()
      .test(
        "lengthAndFile",
        questionHolder.invalidErrorMessage,
        (fileArray) => {
          let valid = true;

          for (let fileObj of fileArray) {
            // check if the user has selected a file
            if (!fileObj.file) {
              valid = false;
            }
          }

          return valid && fileArray.length >= 2 && fileArray.length <= 15;
        },
      ),
  }),
];
