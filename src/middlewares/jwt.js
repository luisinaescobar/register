const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const { JWT_SECRET } = process.env;

        const bearertoken = bearerHeader.split(" ")[1];
        req.token = bearertoken;
        jwt.verify(req.token, JWT_SECRET, async (error, authData) => {
            if (error) {
                return res.send('Invalid token');
            }
            req.user = authData
            return next();
        })
    } else {
        res.send('You need to add your token to the header with the word Bearer');
    }
};
module.exports = verifyToken;