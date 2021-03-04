import { Files, File } from "formidable";
import fs from "fs";
import { IPDFHolder, IPDFBuffer } from "./types/types";

export default class ReconstructQuestionHolder {
  constructor(private multiPage: boolean, private files: Files) {}

  private getReconstructedObject(file: File): IPDFHolder {
    const { path, name } = file;
    const buffer = fs.readFileSync(path);

    const reconstructed: IPDFHolder = {
      name: name,
      path: path,
      file: buffer,
    };

    return reconstructed;
  }

  reconstruct(): IPDFBuffer {
    const resultObj: IPDFBuffer = {};

    for (const key in this.files) {
      const value = this.files[key];

      if (value instanceof Array) {
        const result = new Array<IPDFHolder>();

        for (const fileObj of value) {
          const reconstructed = this.getReconstructedObject(fileObj);
          result.push(reconstructed);
        }

        resultObj[key] = result;
      } else {
        const file = value as File;
        const reconstructed = this.getReconstructedObject(file);
        resultObj[key] = reconstructed;
      }
    }

    // we need to make sure that this is sorted by the name attribute
    const orderedResultObj = Object.keys(resultObj)
      .sort() // question1, question2, question3... etc.
      .reduce((orderedObj, currentKey, _, __) => {
        orderedObj[currentKey] = resultObj[currentKey];
        return orderedObj;
      }, {});

    return orderedResultObj;
  }
}
