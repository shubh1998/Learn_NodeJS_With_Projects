// The error returned by this function is handled in the error handler middleware in app.js.
createStatusCodeError = function (res, statusCode, message) {
	res.statusCode = statusCode;
	return res.json({
		success: false,
		statusCode,
		message,
	});
};

//-------------- Success Response handlers ----- 200 ------
successResponse = function (res, code, data, message) {
	res.statusCode = 201 || code;
	return res.json({
		success: true,
		statusCode: code,
		data,
		message,
	});
};


//---- The 400 Bad Request error----------
badRequestError = function (res, message) {
	return createStatusCodeError(res, 400, message);
};

//--------Preconditions fail (i.e. the client has submitted data that is invalid because of missing values)------------
unverifiedError = function (res, message) {
	return createStatusCodeError(res, 412, message);
};

//-----HTTP Status Code 409: The request could not be completed due to a conflict with the current state of the target resource.-------
blockedError = function (res, message) {
	return createStatusCodeError(res, 409, message);
};

//----A 403 Forbidden error means that you do not have permission to view the requested file or resource.
forbiddenError = function (res, message) {
	return createStatusCodeError(res, 403, message);
};

//-----The 401 Unauthorized error-----------
unauthorizedError = function (message) {
	// return createStatusCodeError(res, 401, message);
	return Object.assign(new Error(), {
		success: false,
		statusCode: 401,
		message,
	});
};

//----- The 404 Requested page Not Found Error----------
notFoundError = function (res, message) {
	return createStatusCodeError(res, 404, message);
};

//------The 503 Intternet Connection Error-----------
networkError = function (res, message) {
	return createStatusCodeError(res, 503, message);
};

//-------------- Link Expired handlers ----- 410 ------
linkExpiredError = function (res, msg) {
	// return createStatusCodeError(410, msg);
	res.statusCode = 410;
	return res.json({
		success: false,
		message: msg,
	});
};

//----------------The 200 - Sucess Response
okResponse = function (res, data, message) {
	res.statusCode = 200;
	if (!message) {
		message = '';
	}
	return successResponse(res, 200, data, message);
};

//-------The HTTP 201 Created success status response code indicates that the request has succeeded and has led to the creation of a resource.-----
createdResponse = function (res, data, message) {
	return successResponse(res, 201, data, message);
};

//----The HTTP 204 No Content success status response code indicates that the request has succeeded,
//----The common use case is to return 204 as a result of a PUT request, updating a resource, without
//----changing the current content of the page displayed to the user.
noContentResponse = function (res, message) {
	return successResponse(res, 204, {}, message);
};
