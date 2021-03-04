export const GENERATE_PDF_ENDPOINT = "api/generate/";

export const makeUrl = (base: string, endpoint: string) => {
  let url = base + endpoint;

  if (!url.endsWith("/")) {
    url += "/";
  }

  return url;
};
