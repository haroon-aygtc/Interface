import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1684156789123 implements MigrationInterface {
  name = "CreateInitialTables1684156789123";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users table
    await queryRunner.query(`
      CREATE TABLE users (
        id VARCHAR(36) NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user', 'guest') NOT NULL DEFAULT 'user',
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE INDEX IDX_users_email (email)
      ) ENGINE=InnoDB
    `);

    // Create sessions table
    await queryRunner.query(`
      CREATE TABLE sessions (
        id VARCHAR(36) NOT NULL,
        userId VARCHAR(36) NOT NULL,
        token VARCHAR(255) NOT NULL,
        expiresAt TIMESTAMP NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE INDEX IDX_sessions_token (token),
        INDEX IDX_sessions_userId (userId),
        CONSTRAINT FK_sessions_users FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
      ) ENGINE=InnoDB
    `);

    // Create permissions table
    await queryRunner.query(`
      CREATE TABLE permissions (
        id VARCHAR(36) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE INDEX IDX_permissions_name (name)
      ) ENGINE=InnoDB
    `);

    // Create role_permissions table
    await queryRunner.query(`
      CREATE TABLE role_permissions (
        id VARCHAR(36) NOT NULL,
        role ENUM('admin', 'user', 'guest') NOT NULL,
        permissionId VARCHAR(36) NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE INDEX IDX_role_permissions_role_permissionId (role, permissionId),
        INDEX IDX_role_permissions_permissionId (permissionId),
        CONSTRAINT FK_role_permissions_permissions FOREIGN KEY (permissionId) REFERENCES permissions (id) ON DELETE CASCADE
      ) ENGINE=InnoDB
    `);

    // Create password_reset table
    await queryRunner.query(`
      CREATE TABLE password_reset (
        id VARCHAR(36) NOT NULL,
        userId VARCHAR(36) NOT NULL,
        token VARCHAR(255) NOT NULL,
        expiresAt TIMESTAMP NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE INDEX IDX_password_reset_token (token),
        INDEX IDX_password_reset_userId (userId),
        CONSTRAINT FK_password_reset_users FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
      ) ENGINE=InnoDB
    `);

    // Insert default permissions
    await queryRunner.query(`
      INSERT INTO permissions (id, name, description) VALUES
      (UUID(), 'MANAGE_USERS', 'Permission to manage users'),
      (UUID(), 'MANAGE_ROLES', 'Permission to manage roles'),
      (UUID(), 'MANAGE_SETTINGS', 'Permission to manage settings'),
      (UUID(), 'MANAGE_CONTENT', 'Permission to manage content'),
      (UUID(), 'VIEW_ANALYTICS', 'Permission to view analytics'),
      (UUID(), 'EXPORT_DATA', 'Permission to export data'),
      (UUID(), 'VIEW_CONTENT', 'Permission to view content')
    `);

    // Get permission IDs
    const permissions = await queryRunner.query(
      `SELECT id, name FROM permissions`,
    );
    const permissionMap = permissions.reduce((map: any, p: any) => {
      map[p.name] = p.id;
      return map;
    }, {});

    // Assign permissions to admin role
    for (const permName of Object.keys(permissionMap)) {
      await queryRunner.query(`
        INSERT INTO role_permissions (id, role, permissionId) VALUES
        (UUID(), 'admin', '${permissionMap[permName]}')
      `);
    }

    // Assign some permissions to user role
    const userPermissions = ["VIEW_CONTENT", "VIEW_ANALYTICS"];
    for (const permName of userPermissions) {
      await queryRunner.query(`
        INSERT INTO role_permissions (id, role, permissionId) VALUES
        (UUID(), 'user', '${permissionMap[permName]}')
      `);
    }

    // Assign minimal permissions to guest role
    await queryRunner.query(`
      INSERT INTO role_permissions (id, role, permissionId) VALUES
      (UUID(), 'guest', '${permissionMap["VIEW_CONTENT"]}')
    `);

    // Create default admin user with hashed password 'admin123'
    await queryRunner.query(`
      INSERT INTO users (id, name, email, password, role) VALUES
      (UUID(), 'Admin User', 'admin@example.com', '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', 'admin')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE password_reset`);
    await queryRunner.query(`DROP TABLE role_permissions`);
    await queryRunner.query(`DROP TABLE permissions`);
    await queryRunner.query(`DROP TABLE sessions`);
    await queryRunner.query(`DROP TABLE users`);
  }
}
