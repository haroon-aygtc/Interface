/**
 * Export all schema definitions
 */

const userSchema = require("./users.schema");
const sessionSchema = require("./sessions.schema");
const passwordResetSchema = require("./password_resets.schema");
const permissionsSchema = require("./permissions.schema");

module.exports = {
  userSchema,
  sessionSchema,
  passwordResetSchema,
  permissionsSchema,
};
