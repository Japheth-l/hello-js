require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const todosRouter = require('./routes/todos');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./errors/AppError');

const app = express();

// ---- Global Middleware -----------------------------
app.use(morgan('dev'));   // log every request to terminal
app.use(express.json());  // parse JSON request bodies

// -- Routes --------------------------------------------
app.use('/api/todos', todosRouter);

//-- 404 - no rpute matched -----------------------------
app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.method} ${req.url} on this server`, 404));
});

app.use(errorHandler);

// -- Start server -----------------------------------------
const PORT = process.env.PORT || 3000; // fallback to 3000 if .env is missing
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});