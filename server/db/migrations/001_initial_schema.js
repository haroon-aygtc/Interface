/**
 * Initial database schema migration
 */

const {
  userSchema,
  sessionSchema,
  passwordResetSchema,
  permissionsSchema,
} = require("../schemas");

/**
 * Generate CREATE TABLE SQL from schema definition
 */
function generateCreateTableSQL(schema) {
  const { tableName, columns, indexes = [], foreignKeys = [] } = schema;

  // Generate column definitions
  const columnDefs = Object.entries(columns)
    .map(([columnName, columnDef]) => {
      let sql = `${columnName} ${columnDef.type}`;

      if (columnDef.primaryKey) sql += " PRIMARY KEY";
      if (columnDef.notNull) sql += " NOT NULL";
      if (columnDef.unique) sql += " UNIQUE";
      if (columnDef.defaultValue) sql += ` DEFAULT ${columnDef.defaultValue}`;
      if (columnDef.onUpdate) sql += ` ON UPDATE ${columnDef.onUpdate}`;

      return sql;
    })
    .join(",\n  ");

  // Generate index definitions
  const indexDefs = indexes
    .map((index) => {
      return `INDEX ${index.name} (${index.columns.join(", ")})`;
    })
    .join(",\n  ");

  // Generate foreign key definitions
  const fkDefs = foreignKeys
    .map((fk, i) => {
      return `FOREIGN KEY (${fk.columns.join(", ")}) REFERENCES ${fk.referenceTable}(${fk.referenceColumns.join(", ")})${fk.onDelete ? ` ON DELETE ${fk.onDelete}` : ""}`;
    })
    .join(",\n  ");

  // Combine all parts
  let sql = `CREATE TABLE IF NOT EXISTS ${tableName} (\n  ${columnDefs}`;

  if (indexes.length > 0) {
    sql += `,\n  ${indexDefs}`;
  }

  if (foreignKeys.length > 0) {
    sql += `,\n  ${fkDefs}`;
  }

  sql += "\n)";

  return sql;
}

/**
 * Generate DROP TABLE SQL
 */
function generateDropTableSQL(schema) {
  return `DROP TABLE IF EXISTS ${schema.tableName}`;
}

module.exports = {
  name: "001_initial_schema",

  /**
   * Apply the migration
   */
  up: async (db) => {
    // Create tables in the correct order (respecting foreign key constraints)
    await db.query(generateCreateTableSQL(userSchema));
    await db.query(generateCreateTableSQL(sessionSchema));
    await db.query(generateCreateTableSQL(passwordResetSchema));
    await db.query(generateCreateTableSQL(permissionsSchema));

    // Insert default permissions
    await db.query(`
      INSERT INTO permissions (id, role, permissions)
      VALUES 
        (UUID(), 'admin', JSON_ARRAY('view_dashboard', 'manage_users', 'manage_ai_models', 'manage_context_rules', 'manage_prompt_templates', 'view_analytics', 'manage_web_scraping', 'manage_integration', 'manage_system_config', 'manage_knowledge_base')),
        (UUID(), 'user', JSON_ARRAY('view_dashboard', 'view_analytics')),
        (UUID(), 'guest', JSON_ARRAY())
    `);
  },

  /**
   * Revert the migration
   */
  down: async (db) => {
    // Drop tables in reverse order (respecting foreign key constraints)
    await db.query(generateDropTableSQL(permissionsSchema));
    await db.query(generateDropTableSQL(passwordResetSchema));
    await db.query(generateDropTableSQL(sessionSchema));
    await db.query(generateDropTableSQL(userSchema));
  },
};
