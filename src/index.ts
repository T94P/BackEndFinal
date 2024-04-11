import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes';
import movieRoutes from './routes/movieRoutes';
import { authMiddleware } from './middleware/authMiddleware';
import { adminMiddleware } from './middleware/adminMiddleware';

import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());



// Middleware setup
// app.use(authMiddleware);
// app.use(adminMiddleware);

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
    console.error('The MONGO_URL environment variable is not set.');
    process.exit(1);
}

const server = http.createServer(app);

mongoose.connect(MONGO_URL)
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}/`);
        });
    })
    .catch(error => {
        console.error('Database connection failed:', error);
        process.exit();
    });