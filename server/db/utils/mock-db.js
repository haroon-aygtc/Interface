/**
 * Mock database implementation for development
 */

const fs = require("fs").promises;
const path = require("path");
const { PERMISSIONS } = require("../../constants/auth");

class MockDatabase {
  constructor(dbFilePath) {
    this.dbFilePath = dbFilePath;
    this.data = null;
  }

  /**
   * Initialize the database
   */
  async init() {
    try {
      // Check if the database file exists
      await fs.access(this.dbFilePath);

      // Load the database
      const data = await fs.readFile(this.dbFilePath, "utf8");
      this.data = JSON.parse(data);

      console.log("Mock database loaded successfully.");
    } catch (error) {
      // Create a new database file if it doesn't exist
      console.log("Creating new mock database...");

      this.data = {
        users: [
          {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            password:
              "$2a$10$XQCg1z4YUl0cCDhRPQN8a.eOzVJRTI8.zsM.FILXCn7IxxYJwmRaK", // 'password'
            role: "admin",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "2",
            name: "Test User",
            email: "user@example.com",
            password:
              "$2a$10$XQCg1z4YUl0cCDhRPQN8a.eOzVJRTI8.zsM.FILXCn7IxxYJwmRaK", // 'password'
            role: "user",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        sessions: [],
        passwordResets: [],
        permissions: [
          {
            role: "admin",
            permissions: Object.values(PERMISSIONS),
          },
          {
            role: "user",
            permissions: [
              PERMISSIONS.VIEW_DASHBOARD,
              PERMISSIONS.VIEW_ANALYTICS,
            ],
          },
          {
            role: "guest",
            permissions: [],
          },
        ],
      };

      await this.save();
      console.log("Mock database created successfully.");
    }

    return this;
  }

  /**
   * Save the database to file
   */
  async save() {
    try {
      // Ensure the directory exists
      const dir = path.dirname(this.dbFilePath);
      await fs.mkdir(dir, { recursive: true });

      // Write the data to file
      await fs.writeFile(
        this.dbFilePath,
        JSON.stringify(this.data, null, 2),
        "utf8",
      );
    } catch (error) {
      console.error("Failed to save mock database:", error);
      throw error;
    }
  }

  /**
   * Find a user by email
   */
  async findUserByEmail(email) {
    const user = this.data.users.find((u) => u.email === email);
    return user || null;
  }

  /**
   * Find a user by ID
   */
  async findUserById(id) {
    const user = this.data.users.find((u) => u.id === id);
    return user || null;
  }

  /**
   * Create a new user
   */
  async createUser(userData) {
    const id = `user-${Date.now()}`;
    const now = new Date().toISOString();

    const newUser = {
      id,
      ...userData,
      createdAt: now,
      updatedAt: now,
    };

    this.data.users.push(newUser);
    await this.save();

    return newUser;
  }

  /**
   * Update a user
   */
  async updateUser(id, userData) {
    const index = this.data.users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    this.data.users[index] = {
      ...this.data.users[index],
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    await this.save();
    return this.data.users[index];
  }

  /**
   * Delete a user
   */
  async deleteUser(id) {
    const initialLength = this.data.users.length;
    this.data.users = this.data.users.filter((u) => u.id !== id);

    if (initialLength !== this.data.users.length) {
      await this.save();
      return true;
    }

    return false;
  }

  /**
   * Get all users
   */
  async getAllUsers() {
    return [...this.data.users];
  }

  /**
   * Create a session token
   */
  async createToken(userId) {
    const token = `token-${userId}-${Date.now()}`;
    const now = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours

    const session = {
      id: `session-${Date.now()}`,
      userId,
      token,
      expiresAt,
      createdAt: now,
    };

    this.data.sessions.push(session);
    await this.save();

    return token;
  }

  /**
   * Validate a token
   */
  async validateToken(token) {
    const session = this.data.sessions.find((s) => s.token === token);
    if (!session) return null;

    // Check if session is expired
    if (new Date(session.expiresAt) < new Date()) return null;

    return this.findUserById(session.userId);
  }

  /**
   * Remove a token
   */
  async removeToken(userId) {
    this.data.sessions = this.data.sessions.filter((s) => s.userId !== userId);
    await this.save();
  }

  /**
   * Get permissions for a role
   */
  async getUserPermissions(role) {
    const rolePermission = this.data.permissions.find((rp) => rp.role === role);
    return rolePermission?.permissions || [];
  }

  /**
   * Check if a role has a permission
   */
  async hasPermission(role, permission) {
    const permissions = await this.getUserPermissions(role);
    return permissions.includes(permission);
  }

  /**
   * Create a password reset token
   */
  async createPasswordReset(userId) {
    const now = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours
    const token = `reset-${Date.now()}`;

    const passwordReset = {
      id: `reset-${Date.now()}`,
      userId,
      token,
      expiresAt,
      createdAt: now,
      used: false,
    };

    this.data.passwordResets.push(passwordReset);
    await this.save();

    return passwordReset;
  }

  /**
   * Find a password reset by token
   */
  async findPasswordResetByToken(token) {
    return (
      this.data.passwordResets.find(
        (r) =>
          r.token === token && !r.used && new Date(r.expiresAt) > new Date(),
      ) || null
    );
  }

  /**
   * Mark a password reset as used
   */
  async markPasswordResetAsUsed(id) {
    const reset = this.data.passwordResets.find((r) => r.id === id);
    if (reset) {
      reset.used = true;
      await this.save();
    }
  }
}

module.exports = MockDatabase;
