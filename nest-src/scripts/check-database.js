/**
 * Simple script to check database connection
 */

const mysql = require("mysql2/promise");
const { config } = require("dotenv");

// Load environment variables
config();

async function checkDatabase() {
  const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } =
    process.env;

  if (!DB_HOST || !DB_PORT || !DB_USERNAME || !DB_DATABASE) {
    console.error("Missing database configuration in environment variables");
    process.exit(1);
  }

  console.log("Database configuration found:");
  console.log(`- Host: ${DB_HOST}`);
  console.log(`- Port: ${DB_PORT}`);
  console.log(`- User: ${DB_USERNAME}`);
  console.log(`- Database: ${DB_DATABASE}`);

  try {
    // Try to connect to the server first (without specifying a database)
    const serverConnection = await mysql.createConnection({
      host: DB_HOST,
      port: parseInt(DB_PORT, 10),
      user: DB_USERNAME,
      password: DB_PASSWORD || "",
    });

    console.log("✅ Successfully connected to MySQL server");

    // Check if database exists
    const [rows] = await serverConnection.query(
      `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?`,
      [DB_DATABASE],
    );

    if (rows.length > 0) {
      console.log(`✅ Database '${DB_DATABASE}' exists`);

      // Try to connect to the specific database
      const dbConnection = await mysql.createConnection({
        host: DB_HOST,
        port: parseInt(DB_PORT, 10),
        user: DB_USERNAME,
        password: DB_PASSWORD || "",
        database: DB_DATABASE,
      });

      console.log(`✅ Successfully connected to '${DB_DATABASE}' database`);

      // Check for tables
      const [tables] = await dbConnection.query(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = ?",
        [DB_DATABASE],
      );

      if (tables.length > 0) {
        console.log(`✅ Database contains ${tables.length} tables:`);
        tables.forEach((table, index) => {
          console.log(
            `   ${index + 1}. ${table.TABLE_NAME || table.table_name}`,
          );
        });
      } else {
        console.log("⚠️ Database exists but contains no tables");
        console.log("   You may want to run: npm run db:migrate");
      }

      await dbConnection.end();
    } else {
      console.log(`❌ Database '${DB_DATABASE}' does not exist`);
      console.log("   You may want to run: npm run db:create");
    }

    await serverConnection.end();
  } catch (error) {
    console.error("❌ Error checking database:");
    console.error(error.message);
    process.exit(1);
  }
}

checkDatabase();
