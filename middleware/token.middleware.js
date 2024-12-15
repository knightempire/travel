const jwt = require('jsonwebtoken');


const generateToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin || false,
    };


    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    return token;
};


const tokenMiddleware = (req, res, next) => {
    if (req.user) {
        const token = generateToken(req.user);
        req.token = token;
    }
    next();
};

module.exports = { generateToken, tokenMiddleware };