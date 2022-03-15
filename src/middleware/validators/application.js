import initMiddleware from "../init-middleware";
import validateMiddleware from "../validate-middleware";
import { check, validationResult } from "express-validator";

export const verifyApplication = initMiddleware(
  validateMiddleware(
    [
      check("firstName")
        .isLength({ min: 1 })
        .withMessage("Please input your First Name"),
      check("lastName")
        .isLength({ min: 1 })
        .withMessage("Please input your Last name"),
      check("location")
        .isLength({ min: 1 })
        .withMessage("Please input your location"),
      check("email")
        .isLength({ min: 1 })
        .isEmail()
        .withMessage("Please input your email"),
      check("cvFile")
        .isLength({ min: 1 })
        .withMessage("Please input your cvFile"),
    ],
    validationResult
  )
);

export const verifyUpdateStatusApplication = initMiddleware(
  validateMiddleware(
    [
      check("status")
        .isLength({ min: 1 })
        .withMessage("Please input your Status"),
    ],
    validationResult
  )
);
