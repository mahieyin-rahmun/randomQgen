import { PDFDocument } from "pdf-lib";

export interface IPDFHolder {
  name: string,
  path: string,
  file: Buffer
};

export interface IPDFBuffer {
  [name: string]: IPDFHolder | IPDFHolder[]
};


export type PDFDocAndPageCount = {
  pdfDoc: PDFDocument, 
  numberOfPages: number
};