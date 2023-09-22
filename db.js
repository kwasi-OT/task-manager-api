const pgp = require('pg-promise')();
const connectionString = "postgres://default:aZEMy1H4gwQL@ep-shiny-resonance-58733223.us-east-1.postgres.vercel-storage.com:5432/verceldb"; // Replace with your PostgreSQL connection details
const db = pgp(connectionString);

module.exports = { db, pgp };
