exports.module = setResponse = (statusCode, success, message, data) => {
  let responseObject = {
    status: statusCode,
    success: success,
    message: message
  };
  if (data) {
    responseObject.data = data;
    return responseObject;
  } else {
    return responseObject;
  }
};
