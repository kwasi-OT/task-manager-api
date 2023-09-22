const pgp = require('pg-promise')();
const connectionString = 'postgres://your-username:your-password@localhost:5432/task_manager'; // Replace with your PostgreSQL connection details
const db = pgp(connectionString);

module.exports = { db, pgp };
