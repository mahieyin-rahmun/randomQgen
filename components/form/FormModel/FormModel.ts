import { TFormModel } from "../../../utils/types";

const formModel: TFormModel = {
  formId: "paramtersPdf",
  formField: {
    isMultiPage: {
      name: "isMultiPage" as const,
      label: "Do you have multi page questions in the PDF?" as const,
      requiredErrorMessage: "You must specify this parameter" as const,
    },
    numberOfStudents: {
      name: "numberOfStudents",
      label: "Number of students you want to create questions for" as const,
      requiredErrorMessage: "You must specify your number of students" as const,
      invalidErrorMessage: "This must be between 8 and 50" as const,
    },
    studentIdTextFile: {
      name: "studentIdTextFile" as const,
      label: "(Optional) Upload a text file containing your student IDs" as const,
    },
    questionHolder: {
      name: "questionHolder" as const,
      label: "Add question PDFs (single page/multi page)" as const,
      requiredErrorMessage: "You must add files for at least two questions" as const,
      invalidErrorMessage: "You can have at most 15 questions" as const
    },
  },
};

export default formModel;