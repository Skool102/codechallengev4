// controllers/accessCodeController.js
import { db } from '../firebase.js';

function generateRandomCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function createNewAccessCode(req, res) {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    const accessCode = generateRandomCode();

    try {
        const userRef = db.collection('users').doc(phoneNumber);
        await userRef.set({ accessCode, phoneNumber, createdAt: new Date().toISOString() }, { merge: true });
        return res.json({ success: true, accessCode });
    } catch (error) {
        console.error('Error creating access code:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function validateAccessCode(req, res) {
    const { phoneNumber, accessCode } = req.body;

    if (!phoneNumber || !accessCode) {
        return res.status(400).json({ error: 'Phone number and access code are required' });
    }

    try {
        const userRef = db.collection('users').doc(phoneNumber);
        const doc = await userRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'User not found' });
        }

        const data = doc.data();
        if (data.accessCode !== accessCode) {
            return res.status(401).json({ error: 'Invalid access code' });
        }

        // Valid code → remove it
        await userRef.update({ accessCode: '' });

        return res.json({ success: true });
    } catch (error) {
        console.error('Error validating access code:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
