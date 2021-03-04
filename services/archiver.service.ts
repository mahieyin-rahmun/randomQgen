import archiver, { Archiver, ZipOptions } from "archiver";
import fs from "fs";
import { TGeneratedPDFBuffer } from "../utils/types";

export default class BufferArrayArchiver {
  private archive: Archiver;
  private outputFile: fs.WriteStream;
  private filePath: string;
  private static instance: BufferArrayArchiver;

  private constructor(
    private bufferArray: TGeneratedPDFBuffer[],
    filePath?: string,
    options: ZipOptions = {
      zlib: { level: 9 }, // Sets the compression level.
    },
  ) {
    this.filePath = filePath;
    this.archive = archiver("zip", options);
    this.outputFile = this.filePath
      ? fs.createWriteStream(this.filePath)
      : null;
    this.setUpListeners();

    if (this.outputFile) {
      this.archive.pipe(this.outputFile);
    }
  }

  public get Archive(): Archiver {
    return this.archive;
  }

  public set FilePath(newFilePath: string) {
    this.filePath = newFilePath;
  }

  public set OutputStream(newOutputStream) {
    this.outputFile = newOutputStream;
    this.archive.pipe(this.outputFile);
  }

  private setUpListeners() {
    this.outputFile?.on("close", () => {
      console.log(this.archive.pointer() + " bytes written");
    });

    this.archive.on("warning", (err) => {
      if (err.code === "ENOENT") {
        console.log(err.message);
      } else {
        // throw error
        throw err;
      }
    });

    this.archive.on("error", (err) => {
      throw err;
    });
  }

  getArchivedFile() {
    for (let index = 0; index < this.bufferArray.length; index++) {
      const { filename, pdfBuffer } = this.bufferArray[index];
      this.archive.append(pdfBuffer, { name: filename });
    }
  }

  static getBufferArrayArchiver(
    pdfBufferArray: TGeneratedPDFBuffer[],
    filePath?: string,
  ) {
    // singleton because I am not sure if the archiver is thread safe
    if (this.instance) {
      return this.instance;
    }

    this.instance = new BufferArrayArchiver(pdfBufferArray, filePath);
    return this.instance;
  }
}
