import { db } from '@vercel/postgres';
// const pgp = require('pg-promise')();
// const connectionString = POSTGRES_URL; // Replace with your PostgreSQL connection details
// const db = pgp(connectionString);
const client = await db.connect();
await client.sql`SELECT 1`;

module.exports = { db, pgp };
