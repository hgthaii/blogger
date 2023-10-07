import HTTP_STATUS from "../constants/httpStatus.js";

const responseWithData = (res, statusCode, data) => {
    res.status(statusCode).json(data);
};

const ok = (res, data) => {
    return responseWithData(res, HTTP_STATUS.OK, data);
};

const created = (res, data) => {
    return responseWithData(res, HTTP_STATUS.CREATED, data);
};

const noContent = (res) => {
    return responseWithData(res, HTTP_STATUS.NO_CONTENT, {});
};

const badRequest = (res, error) => {
    return responseWithData(res, HTTP_STATUS.BAD_REQUEST, error);
};

const unauthorized = (res, error) => {
    return responseWithData(res, HTTP_STATUS.UNAUTHORIZED, error);
};

const forbidden = (res, error) => {
    return responseWithData(res, HTTP_STATUS.FORBIDDEN, error);
};

const notFound = (res, error) => {
    return responseWithData(res, HTTP_STATUS.NOT_FOUND, error);
};

const internalServerError = (res, error) => {
    return responseWithData(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error);
};

export default {
    ok,
    created,
    noContent,
    badRequest,
    unauthorized,
    forbidden,
    notFound,
    internalServerError,
};
