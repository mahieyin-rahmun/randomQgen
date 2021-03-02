import { NextApiRequest, NextApiResponse } from "next";
import { Fields, Files, IncomingForm } from "formidable";
import fs from "fs";
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
    const form = new IncomingForm();
    form.multiples = true;
    // TODO: change it later
    form.uploadDir =
      "/home/phantomhive/Documents/Code/react/randqgen/pages/api/tmp";

    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
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
      bufferArchiver.getArchivedFile();

      const archive = bufferArchiver.Archive;
      await archive.finalize();
    } catch (err) {
      res.status(500);
      res.end();
    }
  } else {
    res.status(404);
    res.end();
  }
};
