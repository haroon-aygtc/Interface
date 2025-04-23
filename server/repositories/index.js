/**
 * Export all repositories
 */

const userRepository = require("./user.repository");
const sessionRepository = require("./session.repository");
const permissionRepository = require("./permission.repository");
const passwordResetRepository = require("./passwordReset.repository");

module.exports = {
  userRepository,
  sessionRepository,
  permissionRepository,
  passwordResetRepository,
};
