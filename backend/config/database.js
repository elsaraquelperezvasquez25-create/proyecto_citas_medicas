const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class DatabaseSingleton {

    constructor() {

        if (DatabaseSingleton.instance) {
            return DatabaseSingleton.instance;
        }

        const dbPath = path.join(
            __dirname,
            '..',
            'database',
            'medicare_plus.db'
        );

        this.connection = new sqlite3.Database(dbPath, (err) => {

            if (err) {
                console.error('Error al conectar SQLite:', err.message);
            } else {
                console.log('✅ Conectado a SQLite');
            }

        });

        DatabaseSingleton.instance = this;
    }

    getConnection() {
        return this.connection;
    }

}

const database = new DatabaseSingleton();

module.exports = database.getConnection();