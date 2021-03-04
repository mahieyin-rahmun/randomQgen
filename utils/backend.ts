export const BASE = "http://localhost:3000/";
export const GENERATE_PDF_ENDPOINT = "api/generate/";

export const makeUrl = (endpoint: string) => {
  let url = BASE + endpoint;

  if (!url.endsWith("/")) {
    url += "/";
  }

  return url;
};
