import { body, param, query } from "express-validator";

export const createVisitRules = [
  body("guestName")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Guest name 2-100 chars"),
  body("visitDate")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("visitDate in YYYY-MM-DD"),
  body("visitTime")
    .matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
    .withMessage("visitTime in HH:mm 24h"),
  body("countryCode")
    .matches(/^\+?\d{1,4}$/)
    .withMessage("countryCode like +91, 91"),
  body("phoneNumber")
    .matches(/^\d{7,15}$/)
    .withMessage("phoneNumber 7-15 digits"),
  body("email").isEmail().withMessage("Valid email required"),
  body("address").optional().isLength({ max: 200 }),
  body("aadhaar")
    .optional()
    .matches(/^\d{12}$/)
    .withMessage("Aadhaar must be 12 digits"),
  body("notes").optional().isLength({ max: 500 }),
];

export const updateVisitRules = [
  param("id").isMongoId().withMessage("Invalid visit id"),
  body("guestName").optional().trim().isLength({ min: 2, max: 100 }),
  body("visitDate")
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/),
  body("visitTime")
    .optional()
    .matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
  body("countryCode")
    .optional()
    .matches(/^\+?\d{1,4}$/),
  body("phoneNumber")
    .optional()
    .matches(/^\d{7,15}$/),
  body("email").optional().isEmail(),
  body("address").optional().isLength({ max: 200 }),
  body("aadhaar")
    .optional()
    .matches(/^\d{12}$/),
  body("notes").optional().isLength({ max: 500 }),
  body("status").optional().isIn(["scheduled", "completed", "cancelled"]),
];

export const idParamRule = [
  param("id").isMongoId().withMessage("Invalid visit id"),
];

export const listQueryRules = [
  query("status").optional().isIn(["scheduled", "completed", "cancelled"]),
  query("from")
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/),
  query("to")
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/),
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 100 }),
];
