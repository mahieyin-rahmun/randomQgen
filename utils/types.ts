import { PDFDocument } from "pdf-lib";

export interface IQuestionHolder {
  name: string,
  title: string,
  file?: File | FileList
};

type TFormFieldEntry = {
  name: string,
  label: string,
  requiredErrorMessage?: string,
  invalidErrorMessage?: string
};

export type TFormModel = {
  formId: string,
  formField: {
    isMultiPage: TFormFieldEntry,
    numberOfStudents: TFormFieldEntry,
    studentIdTextFile: TFormFieldEntry,
    questionHolder: TFormFieldEntry
  }
};

export interface IFormValues {
  isMultiPage: string,
  numberOfStudents: number,
  studentIdTextFile: File | null,
  questionHolder: IQuestionHolder[]
};

export type IQuestionHolderProps = {
  formModel: TFormModel,
  formValues: IFormValues,
  setValues?: (values: React.SetStateAction<IFormValues>, shouldValidate?: boolean) => void
};