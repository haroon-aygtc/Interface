import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Permission } from "./entities/permission.entity";
import { RolePermission } from "./entities/role-permission.entity";
import { CreatePermissionDto } from "./dto/create-permission.dto";

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
    const rolePermissions = await this.rolePermissionsRepository.find({
      where: { role },
      relations: ["permission"],
    });

    return rolePermissions.map((rp) => rp.permissionId);
  }

  async hasPermission(role: string, permissionName: string): Promise<boolean> {
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
}
