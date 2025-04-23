import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { getConnection } from "typeorm";

async function runMigrations() {
  try {
    // Initialize the NestJS application to load TypeORM configuration
    const app = await NestFactory.createApplicationContext(AppModule);

    console.log("Running pending migrations...");

    // Get the TypeORM connection
    const connection = getConnection();

    // Run pending migrations
    const migrations = await connection.runMigrations();

    if (migrations.length === 0) {
      console.log("✅ No pending migrations to run.");
    } else {
      console.log(`✅ Successfully ran ${migrations.length} migrations:`);
      migrations.forEach((migration, index) => {
        console.log(`   ${index + 1}. ${migration.name}`);
      });
    }

    await app.close();
  } catch (error: any) {
    console.error("Error running migrations:");
    console.error(error.message);
    process.exit(1);
  }
}

runMigrations();
