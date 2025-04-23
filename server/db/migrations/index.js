/**
 * Export all migrations
 */

const initialSchemaMigration = require("./001_initial_schema");

module.exports = [
  initialSchemaMigration,
  // Add new migrations here in order
];
