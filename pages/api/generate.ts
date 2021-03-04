import { NextApiRequest, NextApiResponse } from "next";
import { Fields, Files, IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import { v4 } from "uuid";
import GeneratePdfService from "../../services/generate.service";
import BufferArrayArchiver from "../../services/archiver.service";

export const config = {
  api: {
    bodyParser: false,
  },
};

const getFieldsAndFiles = (
  req: NextApiRequest,
  form: IncomingForm,
): Promise<{
  fields: Fields;
  files: Files;
}> => {
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }

      resolve({ fields, files });
    });
  });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const taskId = v4();
    const rootUploadFolder = path.resolve("/", "tmp", "uploaded");
    const taskFolder = path.resolve(rootUploadFolder, taskId);

    const form = new IncomingForm();
    form.multiples = true;
    form.uploadDir = taskFolder;

    try {
      fs.mkdirSync(form.uploadDir, { recursive: true });
    } catch (error) {
      if (error.code !== "EEXIST") {
        console.log(error);
        res.status(500);
        return res.json({ error: "Sorry, try again in a few moments!" });
      }
    }

    try {
      const { fields, files } = await getFieldsAndFiles(req, form);
      const generatePdfService = new GeneratePdfService(fields, files);
      const pdfBufferArray = await generatePdfService.generatePdfBufferArray();

      const bufferArchiver = BufferArrayArchiver.getBufferArrayArchiver(
        pdfBufferArray,
      );

      res.status(200).setHeader("Content-Type", "application/zip");
      bufferArchiver.OutputStream = res;
      await bufferArchiver.getArchivedFile();

      const archive = bufferArchiver.Archive;
      await archive.finalize();

      // this doesn't need to be awaited as this is server side clean up
      fs.rmSync(taskFolder, { recursive: true });
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.json({ error: "Sorry, try again in a few moments!" });
    }
  } else {
    res.status(404);
    res.end();
  }
};
