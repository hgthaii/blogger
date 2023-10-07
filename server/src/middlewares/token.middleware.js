import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/user.model.js";
import MESSAGES from "../constants/messages.js";
import HTTP_STATUS from "../constants/httpStatus.js";
import responseHandler from "../handlers/response.handler.js";
dotenv.config();

const tokenDecode = (req) => {
    try {
        const accessToken = req.headers["authorization"];
        if (accessToken) {
            const token = accessToken.split(" ")[1];
            return jwt.verify(token, process.env.JWT_SECRET_KEY);
        }
        return false;
    } catch (error) {
        return false;
    }
};

const auth = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (!tokenDecoded) {
        return responseHandler.unauthorized(res, {
            statusCode: HTTP_STATUS.UNAUTHORIZED,
            message: MESSAGES.SESSION_EXPIRED,
        });
    }
    const user = await userModel.findById(tokenDecoded.userId);
    if (!user) {
        return responseHandler.unauthorized(res, {
            statusCode: HTTP_STATUS.UNAUTHORIZED,
            message: MESSAGES.SESSION_EXPIRED,
        });
    }
    req.user = user;
    next();
};

export default { auth, tokenDecode };
