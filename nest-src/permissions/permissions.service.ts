import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { Permission } from "./entities/permission.entity";
import { RolePermission } from "./entities/role-permission.entity";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
    @InjectRepository(RolePermission)
    private rolePermissionsRepository: Repository<RolePermission>,
  ) {}

  async findAll(): Promise<Permission[]> {
    return this.permissionsRepository.find();
  }

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const permission = this.permissionsRepository.create(createPermissionDto);
    return this.permissionsRepository.save(permission);
  }

  async getRolePermissions(role: string): Promise<string[]> {
    // Admin role has all permissions
    if (role === "admin") {
      const allPermissions = await this.permissionsRepository.find();
      return allPermissions.map(p => p.name);
    }

    // For other roles, get the permissions from the database
    const rolePermissions = await this.rolePermissionsRepository.find({
      where: { role },
      relations: ["permission"],
    });

    // Get the permission names
    const permissionIds = rolePermissions.map(rp => rp.permissionId);
    const permissions = await this.permissionsRepository.find({
      where: { id: In(permissionIds) }
    });

    return permissions.map(p => p.name);
  }

  async hasPermission(role: string, permissionName: string): Promise<boolean> {
    // Admin role has all permissions
    if (role === "admin") {
      return true;
    }

    const permission = await this.permissionsRepository.findOne({
      where: { name: permissionName },
    });

    if (!permission) {
      return false;
    }

    const rolePermission = await this.rolePermissionsRepository.findOne({
      where: { role, permissionId: permission.id },
    });

    return !!rolePermission;
  }

  async updateRolePermissions(
    role: string,
    permissionNames: string[],
  ): Promise<void> {
    // Find all permissions by name
    const permissions = await this.permissionsRepository.find({
      where: { name: In(permissionNames) },
    });

    if (permissions.length !== permissionNames.length) {
      // Some permissions don't exist, create them
      const existingNames = permissions.map((p) => p.name);
      const missingNames = permissionNames.filter(
        (name) => !existingNames.includes(name),
      );

      for (const name of missingNames) {
        const newPermission = this.permissionsRepository.create({
          name,
          description: `Permission to ${name.toLowerCase().replace(/_/g, " ")}`,
        });
        permissions.push(await this.permissionsRepository.save(newPermission));
      }
    }

    // Delete existing role permissions
    await this.rolePermissionsRepository.delete({ role });

    // Create new role permissions
    const rolePermissions = permissions.map((permission) => {
      return this.rolePermissionsRepository.create({
        id: uuidv4(),
        role,
        permissionId: permission.id,
      });
    });

    await this.rolePermissionsRepository.save(rolePermissions);
  }

  async getAllRolePermissions(): Promise<
    { role: string; permissions: string[] }[]
  > {
    // Get all permissions
    const allPermissions = await this.permissionsRepository.find();
    const permissionMap = allPermissions.reduce((map, p) => {
      map[p.id] = p.name;
      return map;
    }, {} as Record<string, string>);

    // Get all role permissions
    const rolePermissions = await this.rolePermissionsRepository.find();

    // Group by role
    const roleMap: Record<string, string[]> = {};

    // Add admin role with all permissions
    roleMap["admin"] = allPermissions.map(p => p.name);

    // Process other roles
    for (const rp of rolePermissions) {
      if (rp.role === "admin") continue; // Skip admin as we've already added it

      if (!roleMap[rp.role]) {
        roleMap[rp.role] = [];
      }

      // Add the permission name to the role's permissions
      const permissionName = permissionMap[rp.permissionId];
      if (permissionName) {
        roleMap[rp.role].push(permissionName);
      }
    }

    // Convert to array
    return Object.entries(roleMap).map(([role, permissions]) => ({
      role,
      permissions,
    }));
  }
}
