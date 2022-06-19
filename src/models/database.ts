const sqlite3 = require('sqlite3');
export default class Database{
    sqlite3: { Database: (arg0: string) => any; };
    db: any;

    constructor(){
   this.setSqlite;
   this.setDb;
    }

    setSqlite(){
        this.sqlite3 = sqlite3
    }

    setDb(){
        this.db = this.sqlite3.Database('Database/database.db')
    }

    getDb(){
        return this.db;
    }
}