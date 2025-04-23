import * as mysql from "mysql2/promise";
import { config } from "dotenv";

// Load environment variables
config();

async function createDatabase() {
  const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } =
    process.env;

  if (!DB_HOST || !DB_PORT || !DB_USERNAME || !DB_DATABASE) {
    console.error("Missing database configuration in environment variables");
    process.exit(1);
  }

  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    user: DB_USERNAME,
    password: DB_PASSWORD || "",
  });

  try {
    console.log(`Creating database ${DB_DATABASE}...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\`;`);
    console.log(`Database ${DB_DATABASE} created successfully!`);
  } catch (error) {
    console.error("Error creating database:", error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

createDatabase();
