/*
interface data {
    user: Number; // user.seq
    seq: Number;
    ts: Number;
    cnt: Number;
    name: String;
    detail: string | Object;
    type: Number | String;
    path: String;
    tag: Array<String>;
    alive: Boolean;
}
*/

module.exports = {
    promisify: function (database) {
        return {
            find(query) {
                return new Promise(function (resolve, reject) {
                    database.find(query, function (err, docs) {
                        if (err) {
                            reject(err);
                        }
                        resolve(docs);
                    });
                });
            },
            findOne(query) {
                return new Promise(function (resolve, reject) {
                    database.findOne(query, function (err, doc) {
                        if (err) {
                            reject(err);
                        }
                        resolve(doc);
                    });
                });
            },
            insert(doc) {
                return new Promise(function (resolve, reject) {
                    database.insert(doc, function (err, doc) {
                        if (err) {
                            reject(err);
                        }
                        resolve(doc);
                    });
                });
            },
            update(query, doc) {
                return new Promise(function (resolve, reject) {
                    database.update(query, doc, function (err, doc) {
                        if (err) {
                            reject(err);
                        }
                        resolve(doc);
                    });
                });
            },
            upsert(query, doc) {
                return new Promise(function (resolve, reject) {
                    database.update(
                        query,
                        doc,
                        { upsert: true },
                        function (err, numReplaced, upsert) {
                            if (err) {
                                reject(err);
                            }
                            resolve({ doc, numReplaced, upsert });
                        }
                    );
                });
            },
            delete(query) {
                return new Promise(function (resolve, reject) {
                    database.update(
                        query,
                        { alive: false },
                        function (err, doc) {
                            if (err) {
                                reject(err);
                            }
                            resolve(doc);
                        }
                    );
                });
            },
        };
    },
};
