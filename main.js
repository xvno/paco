// libs
const Koa = require('koa');
const NeDB = require('nedb');

// utils
const { promisify } = require('./libs/dbutils');
const { ensureUser } = require('./libs/user');

// main
const app = new Koa();
const database = new NeDB({ filename: './data/db.nedb', autoload: true });
const db = promisify(database);

// insert a basic user account
ensureUser(db);
