import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import accessCodeRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', accessCodeRoutes);
app.use('/api', employeeRoutes);




// ✅ Khởi động server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
