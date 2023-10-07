import { Router } from "express";
import { body } from "express-validator";
import userController from "../controllers/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import MESSAGES from "../constants/messages.js";
import HTTP_STATUS from "../constants/httpStatus.js";

const router = Router();

router.post(
    "/register",
    body("username")
        .exists()
        .withMessage(`${MESSAGES.USERNAME_IS_REQUIRED}`)
        .isLength({ min: 4, max: 20 })
        .withMessage(`${MESSAGES.USERNAME_LENGTH}`)
        .custom(async (value) => {
            const user = await userModel.findOne({ username: value });
            if (user) {
                return Promise.reject({
                    statusCode: HTTP_STATUS.BAD_REQUEST,
                    message: `${MESSAGES.USERNAME_IS_EXIST}`,
                });
            }
            return true;
        })
        .escape(),
    body("password")
        .exists()
        .withMessage(`${MESSAGES.PASSWORD_IS_REQUIRED}`)
        .isLength({ min: 6, max: 20 })
        .withMessage(`${MESSAGES.PASSWORD_LENGTH}`)
        .escape(),
    body("displayName")
        .exists()
        .withMessage(`${MESSAGES.DISPLAY_NAME_IS_REQUIRED}`)
        .isLength({ min: 2, max: 20 })
        .withMessage(`${MESSAGES.DISPLAY_NAME_LENGTH}`)
        .escape(),
    body("confirmPassword")
        .exists()
        .withMessage(`${MESSAGES.CONFIRM_PASSWORD_IS_REQUIRED}`)
        .escape()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error(`${MESSAGES.CONFIRM_PASSWORD_INCORRECT}`);
            }
            return true;
        }),
    requestHandler.validate,
    userController.register,
);

router.post(
    "/login",
    body("username")
        .exists()
        .withMessage(`${MESSAGES.USERNAME_IS_REQUIRED}`)
        .isLength({ min: 4, max: 20 })
        .withMessage(`${MESSAGES.USERNAME_LENGTH}`)
        .escape(),
    body("password")
        .exists()
        .withMessage(`${MESSAGES.PASSWORD_IS_REQUIRED}`)
        .isLength({ min: 6, max: 20 })
        .withMessage(`${MESSAGES.PASSWORD_LENGTH}`)
        .escape(),
    requestHandler.validate,
    userController.login,
);

router.post("/logout", userController.logout);

export default router;
