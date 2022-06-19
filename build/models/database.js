"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3 = require('sqlite3');
class Database {
    constructor() {
        this.setSqlite;
        this.setDb;
    }
    setSqlite() {
        this.sqlite3 = sqlite3;
    }
    setDb() {
        this.db = this.sqlite3.Database('Database/database.db');
    }
    getDb() {
        return this.db;
    }
}
exports.default = Database;
