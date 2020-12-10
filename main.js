const Koa = require('koa');
const NeDB = require('nedb');

const app = new Koa();
const db = new NeDB({ filename: './data/db.nedb', autoload: true });

db.findOne({ seq: 1 }, function (err, docs) {
    if (err) {
        return console.log('error occured:', err);
    }
    console.log('data: ', docs);
    if (!doc) {
        init(db);
    }
});

function init(database) {
    return new Promise(function (resolve, reject) {
        database.update(
            { seq: 1, type: 'user' },
            {
                seq: 1,
                ts: Date.now(),
                cnt: 0,
                name: 'volving',
                detail: 'volving',
                type: 'user',
                path: '',
                tag: [],
            },
            { upsert: true },
            (err, numRepaced, upsert) => {
                if (err) {
                    reject(new Error('Upsert error!'));
                }
                return console.log(
                    'numRepaced: ',
                    numRepaced,
                    ' upsert: ',
                    upsert
                );
                resolve({ numRepaced, upsert });
            }
        );
    });
}
