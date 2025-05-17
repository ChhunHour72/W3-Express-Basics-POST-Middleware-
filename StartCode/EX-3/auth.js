// auth.js
export const authenticate = (req, res, next) => {
    const validToken = "xyz123"; // In real apps, use environment variables
    const { token } = req.query;

    if (!token || token !== validToken) {
        return res.status(401).json({ 
            error: "Unauthorized: Invalid or missing token" 
        });
    }

    next(); // Proceed if token is valid
};