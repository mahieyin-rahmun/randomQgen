import { Fields, Files, File as FormidableFile } from "formidable";
import fs from "fs";
import CombinePdf from "./combinepdf.service";
import ReconstructQuestionHolder from "./reconstruct.questionholder.service";
import { TGeneratedPDFBuffer } from "../utils/types";
import { generateGenericStudentQuestionPDFFileName } from "../utils/utilities";

interface IFields extends Fields {
  isMultiPage: string;
  numberOfStudents: string;
  facultyInitial?: string;
  semester?: string;
}

export default class GeneratePDFBufferService {
  private fields: Fields;
  private files: Files;
  private studentIdTextFile: FormidableFile = null;
  private studentIdList: string[] = null;

  private parseStudentIdTextFile(): string[] {
    const txtFile = fs.readFileSync(this.studentIdTextFile.path);
    const content = txtFile.toString();
    const studentIdArray = content.split("\n");

    return studentIdArray;
  }

  constructor(fields: Fields, files: Files) {
    if (files.studentIdTextFile) {
      // need to separate the student id text file from the pdf files
      this.studentIdTextFile = files.studentIdTextFile as FormidableFile;
      delete files.studentIdTextFile;
      // parse the text file
      this.studentIdList = this.parseStudentIdTextFile();
    }

    this.fields = fields;
    this.files = files;
  }

  async generatePdfBufferArray(): Promise<TGeneratedPDFBuffer[]> {
    const pdfBufferArray = new Array<TGeneratedPDFBuffer>();

    const { isMultiPage, numberOfStudents, facultyInitial, semester } = this
      .fields as IFields;
    const multiPage: boolean = isMultiPage === "yes";
    const numberOfStudentsInt = parseInt(numberOfStudents);

    // this should be outside the for loop as this only needs to be done once
    const reconstructQH = new ReconstructQuestionHolder(multiPage, this.files);
    const pdfBufferObj = reconstructQH.reconstruct();
    const combiner = new CombinePdf(pdfBufferObj, facultyInitial, semester);

    for (let index = 0; index < numberOfStudentsInt; index++) {
      let combinedPdfUint8Array: Uint8Array;
      let studentId: string;

      if (this.studentIdList) {
        studentId = this.studentIdList[index];
      }

      if (multiPage) {
        combinedPdfUint8Array = await combiner.combineMultiPageQuestions(
          studentId,
        );
      } else {
        combinedPdfUint8Array = await combiner.combineSinglePageQuestions(
          studentId,
        );
      }

      const combinedPdfBuffer = Buffer.from(combinedPdfUint8Array);
      pdfBufferArray.push({
        filename: studentId
          ? `${studentId}.pdf`
          : generateGenericStudentQuestionPDFFileName(index),
        pdfBuffer: combinedPdfBuffer,
      });
    }

    return pdfBufferArray;
  }
}
