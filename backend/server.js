import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import dateRoutes from './routes/date.route.js';

const app = express();
const PORT = process.env.PORT || 5000;
const frontend_URL = "https://dates-galaxy-frontend.onrender.com"

app.use(express.json());

dotenv.config();

app.use("/api/dates", dateRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server started @http://localhost:${PORT}`);
})
