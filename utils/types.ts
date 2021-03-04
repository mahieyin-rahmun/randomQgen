export interface IQuestionHolder {
  name: string;
  title: string;
  file?: File | FileList;
}

type TFormFieldEntry = {
  name: string;
  label: string;
  requiredErrorMessage?: string;
  invalidErrorMessage?: string;
};

export type TFormModel = {
  formId: string;
  formField: {
    isMultiPage: TFormFieldEntry;
    numberOfStudents: TFormFieldEntry;
    studentIdTextFile: TFormFieldEntry;
    questionHolder: TFormFieldEntry;
    facultyInitial?: TFormFieldEntry;
    semester?: TFormFieldEntry;
  };
};

export interface IFormValues {
  isMultiPage: string;
  numberOfStudents: number;
  containsFooterInfo: boolean;
  studentIdTextFile: File | null;
  facultyInitial?: string;
  semester?: string;
  questionHolder: IQuestionHolder[];
}

export type IQuestionHolderProps = {
  formModel: TFormModel;
  formValues: IFormValues;
  setValues?: (
    values: React.SetStateAction<IFormValues>,
    shouldValidate?: boolean,
  ) => void;
};
