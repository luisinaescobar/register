const { createHmac } = require('crypto');
function encript(secret) {
    return createHmac('sha256', secret).digest('hex');
};
module.exports = encript;