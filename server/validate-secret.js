const validateSecret = (req, res, next) => {
    if (req.headers.secret !== process.env.SERVICE_SECRET) {
        const msg = `Invalid secret for ${req.path}`;
        console.warn(`Invalid secret for ${req.path}`);
        res.status(404);
        return next(new Error(msg));
    }

    next();
};

module.exports = { validateSecret };
