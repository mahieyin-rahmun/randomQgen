import { TFormModel } from "../../../utils/types";

const formModel: TFormModel = {
  formId: "paramtersPdf",
  formField: {
    isMultiPage: {
      name: "isMultiPage" as const,
      label: "Do you have multi page questions in your question PDFs?" as const,
      requiredErrorMessage: "You must specify this parameter" as const,
    },
    numberOfStudents: {
      name: "numberOfStudents",
      label: "Number of students you want to create questions for" as const,
      requiredErrorMessage: "You must specify your number of students" as const,
      invalidErrorMessage: "This must be between 8 and 50" as const,
    },
    facultyInitial: {
      name: "facultyInitial",
      label: "Initial of Faculty (e.g. SAS3)",
      requiredErrorMessage:
        "Faculty initial is required if you want to have footers in your PDF",
      invalidErrorMessage: "Invalid faculty initial",
    },
    semester: {
      name: "semester",
      label: "Semester (e.g. Spring 2021)",
      requiredErrorMessage:
        "semester is required if you want to have footers in your PDF",
      invalidErrorMessage: "Invalid semester name",
    },
    studentIdTextFile: {
      name: "studentIdTextFile" as const,
      label: "Upload a text file containing your student IDs" as const,
      requiredErrorMessage:
        "student id text file is required if you want to have footers in your PDF",
      invalidErrorMessage:
        "Line count does not match with number of students specified",
    },
    questionHolder: {
      name: "questionHolder" as const,
      label: "Add question PDFs (single page/multi page)" as const,
      requiredErrorMessage: "You must add files for at least two questions" as const,
      invalidErrorMessage: "You can have at least 2 and at most 15 PDFs" as const,
    },
  },
};

export default formModel;
