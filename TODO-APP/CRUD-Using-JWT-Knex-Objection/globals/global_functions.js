// The error returned by this function is handled in the error handler middleware in app.js.
createStatusCodeError = function(statusCode, message) {
  return Object.assign(new Error(), {
    statusCode,
    message
  });
};

//-------------- Success Response handlers ----- 200 ------
successResponse = function(res, code, data, message) {
  return res.status(code || 200).json({
    success: true,
    data,
    message
  });
};


//---- The 400 Bad Request error----------
badRequestError = function(msg) {
  return createStatusCodeError(400, msg);
};

//--------Preconditions fail (i.e. the client has submitted data that is invalid because of missing values)------------
unverifiedError = function(message) {
  return createStatusCodeError(412, message);
};

//-----HTTP Status Code 409: The request could not be completed due to a conflict with the current state of the target resource.-------
blockedError = function(message) {
  return createStatusCodeError(409, message);
};

//----A 403 Forbidden error means that you do not have permission to view the requested file or resource.
forbiddenError = function(msg) {
  return createStatusCodeError(403, msg);
};

//-----The 401 Unauthorized error-----------
unauthorizedError = function(msg) {
  return createStatusCodeError(401, msg);
};

//----- The 404 Requested page Not Found Error----------
notFoundError = function(msg) {
  return createStatusCodeError(404, msg);
};

//------The 503 Intternet COnnection Error-----------
networkError = function(msg) {
  return createStatusCodeError(503, msg);
};

//---------Function to give error status code and message in response-------------------
errorResponse = function(res, data, message, code) {
  res.statusCode = code;
  return res.json({
    success: false,
    code,
    data,
    message
  });
};

//----------------The 200 - Sucess Response
okResponse = function(res, data, message) {
  res.statusCode = 200;
  if (!message) {
    message = "";
  }
  return successResponse(res, 200, data, message);
};

//-------The HTTP 201 Created success status response code indicates that the request has succeeded and has led to the creation of a resource.-----
createdResponse = function(res, data, message) {
  return successResponse(res, 201, data, message);
};

//----The HTTP 204 No Content success status response code indicates that the request has succeeded,
//----The common use case is to return 204 as a result of a PUT request, updating a resource, without
//----changing the current content of the page displayed to the user.
noContentResponse = function(res, message) {
  return successResponse(res, 204, {}, message);
};

// Utility functions
slugify = function(Text) {
  Text = Text || "";
  return Text.toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

//global function that will help use handle promise rejections, this article talks about it http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
to = function(promise) {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [pe(err)]);
};
