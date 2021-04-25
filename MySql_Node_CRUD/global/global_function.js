createStatusCodeError = (res, statusCode, message) => {
    res.statusCode = statusCode;
    return res.json({
        success: false,
        statusCode,
        message
    })
}

successResponse = (res, statusCode, data, message) => {
    res.statusCode=200 || statusCode;
    return res.json({
        success: true,
        statusCode,
        data,
        message
    })
}

badRequestError= (res, message) => {
    return createStatusCodeError(res, 400, message)
}

okResponse = (res, data, message) => {
    return successResponse(res, 200, data, message)
}