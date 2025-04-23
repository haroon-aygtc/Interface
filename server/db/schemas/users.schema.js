/**
 * User schema definition
 */

const userSchema = {
  tableName: "users",
  columns: {
    id: { type: "VARCHAR(36)", primaryKey: true, notNull: true },
    name: { type: "VARCHAR(255)", notNull: true },
    email: { type: "VARCHAR(255)", notNull: true, unique: true },
    password: { type: "VARCHAR(255)", notNull: true },
    role: { type: "VARCHAR(50)", notNull: true, defaultValue: "'user'" },
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
  indexes: [{ name: "idx_email", columns: ["email"] }],
};

module.exports = userSchema;
