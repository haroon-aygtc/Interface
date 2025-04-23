/**
 * Permissions schema definition
 */

const permissionsSchema = {
  tableName: "permissions",
  columns: {
    id: { type: "VARCHAR(36)", primaryKey: true, notNull: true },
    role: { type: "VARCHAR(50)", notNull: true, unique: true },
    permissions: { type: "JSON", notNull: true },
    createdAt: {
      type: "TIMESTAMP",
      notNull: true,
      defaultValue: "CURRENT_TIMESTAMP",
    },
    updatedAt: {
      type: "TIMESTAMP",
      notNull: true,
      defaultValue: "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
    },
  },
};

module.exports = permissionsSchema;
