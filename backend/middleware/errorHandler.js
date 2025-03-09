const errorHandler = (err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    code: err.code
  });

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation error',
      errors: err.errors
    });
  }

  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      message: 'Duplicate entry'
    });
  }

  // Handle MySQL specific errors
  if (err.code === 'ER_BAD_FIELD_ERROR') {
    return res.status(400).json({
      message: 'Invalid field in request',
      error: err.message
    });
  }

  if (err.code === 'ER_NO_DEFAULT_FOR_FIELD') {
    return res.status(400).json({
      message: 'Missing required field',
      error: err.message
    });
  }

  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

module.exports = errorHandler;