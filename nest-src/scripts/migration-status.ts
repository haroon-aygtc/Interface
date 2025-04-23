import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { getConnection } from "typeorm";

async function checkMigrationStatus() {
  try {
    // Initialize the NestJS application to load TypeORM configuration
    const app = await NestFactory.createApplicationContext(AppModule);

    console.log("Checking migration status...");

    // Get the TypeORM connection
    const connection = getConnection();

    // Get all migrations
    const migrations = await connection
      .query("SELECT * FROM migrations ORDER BY timestamp DESC")
      .catch(() => {
        console.log(
          "❌ Migrations table does not exist. No migrations have been run yet.",
        );
        return [];
      });

    if (migrations.length > 0) {
      console.log(`✅ Found ${migrations.length} executed migrations:`);
      migrations.forEach((migration: any, index: number) => {
        console.log(
          `   ${index + 1}. ${migration.name} (${new Date(parseInt(migration.timestamp)).toISOString()})`,
        );
      });
    } else if (migrations.length === 0) {
      console.log("❌ No migrations have been executed yet.");
    }

    // Check for pending migrations
    const pendingMigrations = await connection.showMigrations();

    if (pendingMigrations) {
      console.log("⚠️ There are pending migrations that need to be run.");
      console.log("   Run 'npm run migration:run' to execute them.");
    } else {
      console.log("✅ No pending migrations. Database schema is up to date.");
    }

    await app.close();
  } catch (error: any) {
    console.error("Error checking migration status:");
    console.error(error.message);
    process.exit(1);
  }
}

checkMigrationStatus();
