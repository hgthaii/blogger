import { validationResult } from "express-validator";
import responseHandler from "./response.handler.js";
import MESSAGES from "../constants/messages.js";

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return responseHandler.badRequest(res, {
            statusCode: 400,
            message: MESSAGES.VALIDATE_ERROR,
            errors: errors.array()[0].msg,
        });
    }

    next();
};

export default { validate };
