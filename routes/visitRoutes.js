import { Router } from "express";
import {
  createVisit,
  deleteVisit,
  getVisitById,
  getVisits,
  updateVisit,
} from "../controllers/visitController.js";
import { handleValidation } from "../validators/handleValidation.js";
import {
  createVisitRules,
  idParamRule,
  listQueryRules,
  updateVisitRules,
} from "../validators/visitValidators.js";
import { query } from 'express-validator';


const router = Router();

router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1 }).toInt(),
    query('status')
      .optional()
      .trim() 
      .isIn(['scheduled', 'completed', 'cancelled'])
  ],
  getVisits
);
router.get("/", listQueryRules, handleValidation, getVisits);
router.get("/:id", idParamRule, handleValidation, getVisitById);
router.post("/", createVisitRules, handleValidation, createVisit);
router.put("/:id", updateVisitRules, handleValidation, updateVisit);
router.delete("/:id", idParamRule, handleValidation, deleteVisit);

export default router;
