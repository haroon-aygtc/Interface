import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { Permission } from "../permissions/entities/permission.entity";
import { RolePermission } from "../permissions/entities/role-permission.entity";
import * as bcrypt from "bcrypt";

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    // Get repositories
    const userRepository = app.get<Repository<User>>(getRepositoryToken(User));
    const permissionRepository = app.get<Repository<Permission>>(
      getRepositoryToken(Permission),
    );
    const rolePermissionRepository = app.get<Repository<RolePermission>>(
      getRepositoryToken(RolePermission),
    );

    // Check if admin user exists
    const adminExists = await userRepository.findOne({
      where: { email: "admin@example.com" },
    });

    if (!adminExists) {
      console.log("Creating admin user...");
      const hashedPassword = await bcrypt.hash("admin123", 10);

      const admin = userRepository.create({
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await userRepository.save(admin);
      console.log("Admin user created successfully!");
    } else {
      console.log("Admin user already exists, skipping...");
    }

    // Check if permissions exist
    const permissionsExist = await permissionRepository.count();

    if (permissionsExist === 0) {
      console.log("Creating permissions...");

      const permissions = [
        { name: "MANAGE_USERS", description: "Can manage users" },
        {
          name: "MANAGE_ROLES",
          description: "Can manage roles and permissions",
        },
        { name: "MANAGE_SETTINGS", description: "Can manage system settings" },
        { name: "MANAGE_CONTENT", description: "Can manage content" },
        { name: "VIEW_ANALYTICS", description: "Can view analytics" },
        { name: "EXPORT_DATA", description: "Can export data" },
        { name: "VIEW_CONTENT", description: "Can view content" },
      ];

      for (const perm of permissions) {
        const permission = permissionRepository.create({
          name: perm.name,
          description: perm.description,
        });

        await permissionRepository.save(permission);
      }

      console.log("Permissions created successfully!");
    } else {
      console.log("Permissions already exist, skipping...");
    }

    // Check if role permissions exist
    const rolePermissionsExist = await rolePermissionRepository.count();

    if (rolePermissionsExist === 0) {
      console.log("Creating role permissions...");

      const allPermissions = await permissionRepository.find();
      const permissionMap = allPermissions.reduce(
        (map, perm) => {
          map[perm.name] = perm;
          return map;
        },
        {} as Record<string, Permission>,
      );

      // Admin role gets all permissions
      for (const perm of allPermissions) {
        const rolePermission = rolePermissionRepository.create({
          role: "admin",
          permissionId: perm.id,
        });

        await rolePermissionRepository.save(rolePermission);
      }

      // Editor role gets specific permissions
      const editorPermissions = [
        "MANAGE_CONTENT",
        "VIEW_ANALYTICS",
        "EXPORT_DATA",
      ];
      for (const permName of editorPermissions) {
        const rolePermission = rolePermissionRepository.create({
          role: "editor",
          permissionId: permissionMap[permName].id,
        });

        await rolePermissionRepository.save(rolePermission);
      }

      // Viewer role gets specific permissions
      const viewerPermissions = ["VIEW_CONTENT", "VIEW_ANALYTICS"];
      for (const permName of viewerPermissions) {
        const rolePermission = rolePermissionRepository.create({
          role: "viewer",
          permissionId: permissionMap[permName].id,
        });

        await rolePermissionRepository.save(rolePermission);
      }

      // Guest role gets specific permissions
      const guestPermissions = ["VIEW_CONTENT"];
      for (const permName of guestPermissions) {
        const rolePermission = rolePermissionRepository.create({
          role: "guest",
          permissionId: permissionMap[permName].id,
        });

        await rolePermissionRepository.save(rolePermission);
      }

      console.log("Role permissions created successfully!");
    } else {
      console.log("Role permissions already exist, skipping...");
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await app.close();
  }
}

seed();
