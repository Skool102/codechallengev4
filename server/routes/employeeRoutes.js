// routes/employeeRoutes.js
import express from 'express';
import {
    handleCreateEmployee,
    handleGetEmployee,
    handleGetAllEmployees,
    handleDeleteEmployee,
    handleEditEmployee

} from '../controllers/employeeController.js';

const router = express.Router();

router.post('/CreateEmployee', handleCreateEmployee);
router.get('/GetEmployee/:employeeId', handleGetEmployee);
router.get('/GetAllEmployees', handleGetAllEmployees);
router.post('/DeleteEmployee/:employeeId', handleDeleteEmployee);
router.put('/EditEmployee/:employeeId', handleEditEmployee); //

export default router;
