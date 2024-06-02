import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from './middleware/logger.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import path from 'path';
import blockchainRouter from './routes/blockchain-routes.mjs';

import { fileURLToPath } from 'url';
import ErrorResponse from './utilities/errorResponseModel.mjs';
import transactionRouter from './routes/transaction-routes.mjs';
import cryptoRouter from './routes/crypto-routes.mjs';

import memberRouter from './routes/member-routes.mjs';

dotenv.config({ path: './config/config.env' });

const PORT = process.argv[2] || process.env.PORT || 5001;
const BASE_URL = process.argv[3] || `http://localhost:${PORT}`;
const app = express();
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

global.__appdir = dirname;

// Middleware...
app.use(cors());
app.use(express.json());
app.use('/api/v1/blockchain', blockchainRouter);
app.use('/api/v1/transactions', transactionRouter);
app.use('/api/v1/crypto', cryptoRouter);
app.use('/api/v1/members', memberRouter);

if (process.env.NODE_ENV === 'development') {
  app.use(logger);
}
console.log(`API base URL: ${BASE_URL}/api/v1`);
// Catch all url...
app.all('*', (req, res, next) => {
  next(new ErrorResponse(`Kunde inte hitta resursen ${req.originalUrl}`, 404));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(dirname, './client/index.html'));
});

// Central felhantering...
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
