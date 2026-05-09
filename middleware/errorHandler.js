function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    if (err.isOperational) {
        return res.status(statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error('UNEXPECTED ERROR:', err);
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong on our end',
    });
}

module.exports = errorHandler;