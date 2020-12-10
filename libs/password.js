const crypto = require('crypto');

module.exports = {
    encrypt(raw) {
        const hash = crypto.createHash('sha256');
        hash.update(raw);
        return hash.digest('hex');
    },
};
