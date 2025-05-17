// logger.js
export const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log({
        method: req.method,
        path: req.path,
        query: req.query,
        timestamp
    });
    next(); // Pass control to the next middleware/route
};