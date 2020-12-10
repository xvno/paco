const { user } = require('../conf');
const { encrypt } = require('./password.js');
module.exports = {
    ensureUser,
};

function ensureUser(db) {
    db.findOne({ seq: 1, type: 'user' })
        .then(function (doc) {
            if (!doc) {
                console.log('seq==1 not found, initing...');
                return init(db);
            }
            return doc;
        })
        .then((doc) => {
            console.log('inited: data: ', doc);
            return doc;
        })
        .catch(function (err) {
            console.log('error: ', err);
        });
}

function init(db) {
    return db.upsert(
        { seq: 1, type: 'user' },
        {
            seq: 1,
            ts: Date.now(),
            cnt: 0,
            name: user.name || 'xvno',
            detail: user.detail || 'xvno',
            password: encrypt(user.password || 'Asdf1234'),
            type: 'user',
            path: '',
            tag: [],
        }
    );
}
