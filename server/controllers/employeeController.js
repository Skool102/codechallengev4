// controllers/employeeController.js
import { db, admin } from '../firebase.js';

export async function handleCreateEmployee(req, res) {
    const { name, phone, email, address, role } = req.body;

    if (!name || !phone || !email || !address || !role) {
        return res.status(400).json({ error: 'All fields (name, phone, email, address, role) are required' });
    }

    try {
        const counterRef = db.collection('metadata').doc('employeeCounter');
        const counterDoc = await counterRef.get();

        let newIdNumber = 1;
        if (counterDoc.exists) {
            const data = counterDoc.data();
            newIdNumber = (data.count || 0) + 1;
        }

        const formattedId = String(newIdNumber).padStart(3, '0');
        const status = 'active';

        await db.collection('employees').doc(formattedId).set({
            name,
            phone,
            email,
            address,
            role,
            status: 'active',
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        await counterRef.set({ count: newIdNumber });

        return res.json({ success: true, employeeId: formattedId });
    } catch (error) {
        console.error('Error creating employee:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


export async function handleGetEmployee(req, res) {
    const { employeeId } = req.params;

    if (!employeeId) {
        return res.status(400).json({ error: 'employeeId is required' });
    }

    try {
        const employeeRef = db.collection('employees').doc(employeeId);
        const doc = await employeeRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const data = doc.data();

        if (data.status !== 'active') {
            return res.status(403).json({ error: 'Employee is inactive' });
        }

        return res.json({
            id: doc.id,
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            role: data.role,
            status: data.status || 'unknown',
            createdAt: data.createdAt?.toDate?.().toISOString() || null
        });

    } catch (error) {
        console.error('Error getting employee:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


export async function handleGetAllEmployees(req, res) {
    try {
        const snapshot = await db.collection('employees')
            .get();

        const employees = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                phone: data.phone,
                email: data.email,
                address: data.address,
                role: data.role,
                status: data.status || 'unknown', // 👈 THÊM DÒNG NÀY
                createdAt: data.createdAt?.toDate?.().toISOString() || null
            };
        });

        return res.json(employees);
    } catch (error) {
        console.error('Error getting all employees:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


export async function handleDeleteEmployee(req, res) {
    const { employeeId } = req.params;

    try {
        const employeeRef = db.collection('employees').doc(employeeId);
        await employeeRef.update({ status: 'inactive' });

        return res.json({ success: true });
    } catch (error) {
        console.error('Error deleting employee:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
export async function handleEditEmployee(req, res) {
    const { employeeId } = req.params;
    const { name, phone, email, address, role, status } = req.body;

    if (!employeeId) {
        return res.status(400).json({ error: 'Employee ID is required' });
    }

    try {
        const employeeRef = db.collection('employees').doc(employeeId);
        const doc = await employeeRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const updateData = { name, phone, email, address, role };
        if (status) updateData.status = status;

        await employeeRef.update(updateData);

        return res.json({ success: true });
    } catch (error) {
        console.error('Error updating employee:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}


