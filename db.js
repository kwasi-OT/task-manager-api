import { db } from '@vercel/postgres';
// const pgp = require('pg-promise')();
// const connectionString = POSTGRES_URL; // Replace with your PostgreSQL connection details
// const db = pgp(connectionString);


module.exports = { db, pgp };
