const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: 'No Token'
        });
    }

    try {

        const verified = jwt.verify(
            token,
            'secretkey'
        );

        req.user = verified;

        next();

    } catch (err) {

        return res.status(400).json({
            message: 'Invalid Token'
        });
    }
};