// routes/employeeRoutes.js
import express from 'express';
import {
    handleCreateEmployee,
    handleGetEmployee,
    handleGetAllEmployees,
    handleDeleteEmployee
} from '../controllers/employeeController.js';

const router = express.Router();

router.post('/CreateEmployee', handleCreateEmployee);
router.get('/GetEmployee/:id', handleGetEmployee);
router.get('/GetAllEmployees', handleGetAllEmployees);
router.delete('/DeleteEmployee/:id', handleDeleteEmployee);

export default router;
