import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { connectDB } from './config/db.js';
import visitRoutes from './routes/visitRoutes.js';


const app = express();


// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// Routes
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/visits', visitRoutes);


// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));


// Error handler (last)
app.use((err, req, res, next) => {
console.error(err);
res.status(500).json({ message: 'Internal Server Error' });
});


// Server start
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;


if (!MONGODB_URI) {
console.error('Missing MONGODB_URI in environment');
process.exit(1);
}


await connectDB(MONGODB_URI);


app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});