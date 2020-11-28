class ErrorHandler extends Error {
    constructor(status=500, message) {
      super();
      this.status = status;
      this.message = message;
    }
}

const handleError = (err, res) => {
    if (!err.status) {
        console.error(err);
        err.status = 500;
    }
    res.status(err.status); //internal server errors should have status code of 500
    res.json({
        error: {
            message: err.message,
        }
    })
}

module.exports = {
    ErrorHandler,
    handleError
}