import { showAPIResponseToastMessage } from "./toast-message.util";

const genericHeaders = { "Content-Type": "application/json" };

const generateHeaders = (headers) => {
  return Object.keys(headers).reduce((acc, key) => {
    acc.append(key, headers[key]);
    return acc;
  }, new Headers());
};

const fetchResource = async (url, method, data, headers) => {
  try {
    const fetchHeaders = generateHeaders(headers);
    const config = {
      method: method,
      headers: fetchHeaders,
      ...(data ? { body: JSON.stringify(data) } : {})
    };
    const urlResponse = await fetch(url, config);
    const result = await urlResponse.json();
    showAPIResponseToastMessage(result);
    return result;
  } catch (error) {
    const result = {
      response: {
        errors: [{
          errorTitle: error.message,
          errorDescription: error.toString()
        }]
      }
    }
    showAPIResponseToastMessage(result);
    return result;
  }
};

export const uploadPdf = async (url, files, fileType) => {
  try {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file-${index}`, file);
    })

    const response = await fetch(`${url}&fileType=${fileType}`, {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    showAPIResponseToastMessage(result);
    return result;
  } catch (error) {
    const result = {
      response: {
        errors: [{
          errorTitle: error.message,
          errorDescription: error.toString()
        }]
      }
    }
    showAPIResponseToastMessage(result);
    return result;
  }
};


export const getResource = async (url, headers = genericHeaders) => {
  return fetchResource(url, 'GET', null, headers);
};

export const postResource = async (url, data, headers = genericHeaders) => {
  return fetchResource(url, 'POST', data, headers);
};