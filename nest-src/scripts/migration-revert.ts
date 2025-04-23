import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { getConnection } from "typeorm";

async function revertLastMigration() {
  try {
    // Initialize the NestJS application to load TypeORM configuration
    const app = await NestFactory.createApplicationContext(AppModule);

    console.log("Reverting the last migration...");

    // Get the TypeORM connection
    const connection = getConnection();

    // Revert the last migration
    await connection.undoLastMigration();

    console.log("✅ Successfully reverted the last migration.");

    await app.close();
  } catch (error: any) {
    console.error("Error reverting migration:");
    console.error(error.message);
    process.exit(1);
  }
}

revertLastMigration();
