import { Fields, Files } from "formidable";
import fs from "fs";
import BufferArrayArchiver from "./archiver.service";
import CombinePdf from "./combinepdf.service";
import ReconstructQuestionHolder from "./reconstruct.questionholder.service";

interface IFields extends Fields {
  isMultiPage: string;
  numberOfStudents: string;
}

export default class GeneratePDFBufferService {
  constructor(private fields: Fields, private files: Files) {}

  async generatePdfBufferArray(): Promise<Buffer[]> {
    const pdfBufferArray = new Array<Buffer>();

    const { isMultiPage, numberOfStudents } = this.fields as IFields;
    const multiPage: boolean = isMultiPage === "yes";
    const numberOfStudentsInt = parseInt(numberOfStudents);

    // this should be outside the for loop as this only needs to be done once
    const reconstructQH = new ReconstructQuestionHolder(multiPage, this.files);
    const pdfBufferObj = reconstructQH.reconstruct();

    for (let index = 0; index < numberOfStudentsInt; index++) {
      const combiner = new CombinePdf(pdfBufferObj);

      let combinedPdfUint8Array: Uint8Array;

      if (multiPage) {
        combinedPdfUint8Array = await combiner.combineMultiPageQuestions();
      } else {
        combinedPdfUint8Array = await combiner.combineSinglePageQuestions();
      }

      const combinedPdfBuffer = Buffer.from(combinedPdfUint8Array);
      pdfBufferArray.push(combinedPdfBuffer);
    }

    return pdfBufferArray;
  }
}
