import { PDFDocument } from "pdf-lib";
import { 
  IPDFBuffer,
  IPDFHolder,
  PDFDocAndPageCount
} from "./types/types";

class CombinePdf {
  
  constructor(private questionPdfBuffer: IPDFBuffer) {}

  private async getPdfAndPageCount(arrayBuffer: ArrayBuffer): Promise<PDFDocAndPageCount> {
    const currentPdfDoc = await PDFDocument.load(arrayBuffer);
    const currentPdfDocPagesCount = currentPdfDoc.getPageCount();

    return {
      pdfDoc: currentPdfDoc, 
      numberOfPages: currentPdfDocPagesCount
    };
  }

  async combineSinglePageQuestions(): Promise<Uint8Array> {
    const questionPdf = await PDFDocument.create();  
    const questionPdfBuffer = this.questionPdfBuffer;

    for (const key in questionPdfBuffer) {
      // get the buffer for the current question file
      const currentQuestion = questionPdfBuffer[key] as IPDFHolder;
      const arrayBuffer = currentQuestion.file;
      // construct pdf with the arrayBuffer
      const { pdfDoc, numberOfPages } = await this.getPdfAndPageCount(arrayBuffer);
      // copy a random page from the current pdf
      const randomIndex = Math.floor(Math.random() * numberOfPages);
      const [randomPage] = await questionPdf.copyPages(pdfDoc, [randomIndex]);
      
      // append the page to the question pdf
      questionPdf.addPage(randomPage);
    }

    return (await this.serialize(questionPdf));
  }

  async combineMultiPageQuestions(): Promise<Uint8Array> {
    const questionPdf = await PDFDocument.create();
    const questionPdfBuffer = this.questionPdfBuffer;

    for (const key in questionPdfBuffer) {
      let currentQuestion = questionPdfBuffer[key];
      let randomPdfArrayBuffer;

      if (currentQuestion instanceof Array) {
        currentQuestion = currentQuestion as IPDFHolder[];
        // get a single, random pdf instance from the choices array
        const randomIndex = Math.floor(Math.random() * currentQuestion.length);
        const randomPdf = currentQuestion[randomIndex];
        randomPdfArrayBuffer = randomPdf.file;
      } else {
        // append this pdf as-is
        currentQuestion = currentQuestion as IPDFHolder;
        randomPdfArrayBuffer = currentQuestion.file;
      }
      // create pdf with the array buffer
      const { pdfDoc, numberOfPages } = await this.getPdfAndPageCount(randomPdfArrayBuffer);
      // copy all pages from the current pdf to the final pdf
      const [...pages] = await questionPdf.copyPages(
        pdfDoc, 
        Array.from(Array(numberOfPages).keys())
      );
      
      // append all the pages from the choice pdf to the question pdf
      for (let page of pages) {
        questionPdf.addPage(page);
      }  
    }

    return (await this.serialize(questionPdf));
  }

  private async serialize(questionPdf: PDFDocument): Promise<Uint8Array> {
    const questionPdfBytes = await questionPdf.save();
    return questionPdfBytes;
  }
}

export default CombinePdf;