// validateQuery.js
export const validateQueryParams = (req, res, next) => {
    const { minCredits, maxCredits } = req.query;

    // Check if minCredits/maxCredits are numbers
    if (minCredits && isNaN(Number(minCredits))) {
        return res.status(400).json({ 
            error: "minCredits must be a number" 
        });
    }
    if (maxCredits && isNaN(Number(maxCredits))) {
        return res.status(400).json({ 
            error: "maxCredits must be a number" 
        });
    }

    // Check if minCredits > maxCredits
    if (minCredits && maxCredits && Number(minCredits) > Number(maxCredits)) {
        return res.status(400).json({ 
            error: "minCredits cannot be greater than maxCredits" 
        });
    }

    next(); // Proceed if validation passes
};