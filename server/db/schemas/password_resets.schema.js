/**
 * Password reset schema definition
 */

const passwordResetSchema = {
  tableName: "password_resets",
  columns: {
    id: { type: "VARCHAR(36)", primaryKey: true, notNull: true },
    userId: { type: "VARCHAR(36)", notNull: true },
    token: { type: "VARCHAR(255)", notNull: true, unique: true },
    expiresAt: { type: "TIMESTAMP", notNull: true },
    createdAt: {
      type: "TIMESTAMP",
      notNull: true,
      defaultValue: "CURRENT_TIMESTAMP",
    },
    used: { type: "BOOLEAN", notNull: true, defaultValue: "FALSE" },
  },
  indexes: [
    { name: "idx_token", columns: ["token"] },
    { name: "idx_userId", columns: ["userId"] },
  ],
  foreignKeys: [
    {
      columns: ["userId"],
      referenceTable: "users",
      referenceColumns: ["id"],
      onDelete: "CASCADE",
    },
  ],
};

module.exports = passwordResetSchema;
