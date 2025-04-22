import { User, Role, RoleWithPermissions, PERMISSIONS } from "@/types/auth";
import { mockUsers } from "@/lib/mockData";

// In-memory database for development
class JsonDatabase {
  private users: User[];
  private tokens: Record<string, string>; // userId -> token
  private rolePermissions: RoleWithPermissions[];

  constructor() {
    // Initialize with mock data
    this.users = mockUsers.map((user) => ({
      ...user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    this.tokens = {};

    // Initialize role permissions
    this.rolePermissions = [
      {
        role: "admin",
        permissions: Object.values(PERMISSIONS), // Admin has all permissions
      },
      {
        role: "user",
        permissions: [PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.VIEW_ANALYTICS],
      },
      {
        role: "guest",
        permissions: [],
      },
    ];
  }

  // User methods
  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);
    return user || null;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    return user || null;
  }

  async createUser(
    userData: Omit<User, "id" | "createdAt" | "updatedAt">,
  ): Promise<User> {
    const newUser: User = {
      id: `user-${Date.now()}`,
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    return newUser;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    this.users[index] = {
      ...this.users[index],
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    return this.users[index];
  }

  // Token methods
  async createToken(userId: string): Promise<string> {
    const token = `token-${userId}-${Date.now()}`;
    this.tokens[userId] = token;
    return token;
  }

  async validateToken(token: string): Promise<User | null> {
    const userId = Object.keys(this.tokens).find(
      (id) => this.tokens[id] === token,
    );
    if (!userId) return null;

    return this.findUserById(userId);
  }

  async removeToken(userId: string): Promise<void> {
    delete this.tokens[userId];
  }

  // Permission methods
  async getUserPermissions(role: Role): Promise<string[]> {
    const rolePermission = this.rolePermissions.find((rp) => rp.role === role);
    return rolePermission?.permissions || [];
  }

  async hasPermission(role: Role, permission: string): Promise<boolean> {
    const permissions = await this.getUserPermissions(role);
    return permissions.includes(permission);
  }
}

// Create a singleton instance
const db = new JsonDatabase();

export default db;
