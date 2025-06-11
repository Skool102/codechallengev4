// routes/accessCodeRoutes.js
import express from 'express';
import { createNewAccessCode, validateAccessCode } from '../controllers/authController.js';

const router = express.Router();

router.post('/CreateNewAccessCode', createNewAccessCode);
router.post('/ValidateAccessCode', validateAccessCode);

export default router;
