/**
 * User service
 */

const bcrypt = require("bcrypt");
const { userRepository } = require("../repositories");

const userService = {
  /**
   * Get all users
   */
  async getUsers() {
    return userRepository.getAllUsers();
  },

  /**
   * Get a user by ID
   */
  async getUserById(id) {
    const user = await userRepository.findUserById(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  },

  /**
   * Create a new user
   */
  async createUser(userData) {
    // Hash password
    if (userData.password) {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }

    return userRepository.createUser(userData);
  },

  /**
   * Update a user
   */
  async updateUser(id, userData) {
    // Hash password if provided
    if (userData.password) {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }

    const updatedUser = await userRepository.updateUser(id, {
      ...userData,
      updatedAt: new Date().toISOString(),
    });

    if (!updatedUser) {
      throw new Error(`User with ID ${id} not found`);
    }

    return updatedUser;
  },

  /**
   * Delete a user
   */
  async deleteUser(id) {
    const success = await userRepository.deleteUser(id);
    if (!success) {
      throw new Error(`User with ID ${id} not found`);
    }
  },
};

module.exports = userService;
