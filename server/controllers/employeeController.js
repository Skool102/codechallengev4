import express from 'express';
import {
    createEmployee,
    getEmployeeById,
    getAllEmployees,
    deleteEmployeeById,
    countEmployees
} from '../model/employeeModel.js';

import { admin } from '../firebase.js';

const router = express.Router();

// POST /api/CreateEmployee
router.post('/CreateEmployee', async (req, res) => {
    const { name, email, department } = req.body;
    if (!name || !email || !department) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    try {
        const count = await countEmployees();
        const employeeId = (count + 1).toString().padStart(3, '0');
        const data = {
            name,
            email,
            department,
            createdAt: admin.firestore.Timestamp.fromDate(new Date())
        };

        await createEmployee(employeeId, data);
        return res.json({ success: true, employeeId });
    } catch (error) {
        console.error('CreateEmployee error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/GetEmployee/:id
router.get('/GetEmployee/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const doc = await getEmployeeById(id);
        if (!doc.exists) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        return res.json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error('GetEmployee error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/GetAllEmployees
router.get('/GetAllEmployees', async (req, res) => {
    try {
        const snapshot = await getAllEmployees();
        const employees = [];
        snapshot.forEach(doc => {
            employees.push({ id: doc.id, ...doc.data() });
        });
        return res.json(employees);
    } catch (error) {
        console.error('GetAllEmployees error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE /api/DeleteEmployee/:id
router.delete('/DeleteEmployee/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteEmployeeById(id);
        return res.json({ success: true });
    } catch (error) {
        console.error('DeleteEmployee error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
