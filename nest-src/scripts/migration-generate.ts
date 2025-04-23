import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { getConnection } from "typeorm";
import * as path from "path";
import * as fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function generateMigration() {
  if (process.argv.length < 3) {
    console.error("Please provide a migration name");
    console.error("Usage: npm run migration:generate -- <migration-name>");
    process.exit(1);
  }

  const migrationName = process.argv[2];

  try {
    // Initialize the NestJS application to load TypeORM configuration
    const app = await NestFactory.createApplicationContext(AppModule);

    console.log(`Generating migration: ${migrationName}...`);

    // Use TypeORM CLI to generate the migration
    const { stdout, stderr } = await execAsync(
      `npx typeorm migration:generate -n ${migrationName}`,
    );

    if (stderr && !stderr.includes("Migration")) {
      console.error("Error generating migration:");
      console.error(stderr);
      process.exit(1);
    }

    console.log(stdout);
    console.log(`✅ Migration '${migrationName}' generated successfully!`);

    await app.close();
  } catch (error: any) {
    console.error("Error generating migration:");
    console.error(error.message);
    process.exit(1);
  }
}

generateMigration();
