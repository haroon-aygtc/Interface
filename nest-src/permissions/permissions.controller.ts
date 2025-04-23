import { Controller, Get, Post, Body, UseGuards, Param } from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdateRolePermissionsDto } from "./dto/update-role-permissions.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";

@Controller("permissions")
@UseGuards(JwtAuthGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles("admin")
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles("admin")
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get("role/:role")
  @UseGuards(RolesGuard)
  @Roles("admin")
  getRolePermissions(@Param("role") role: string) {
    return this.permissionsService.getRolePermissions(role);
  }

  @Post("role")
  @UseGuards(RolesGuard)
  @Roles("admin")
  updateRolePermissions(
    @Body() updateRolePermissionsDto: UpdateRolePermissionsDto,
  ) {
    return this.permissionsService.updateRolePermissions(
      updateRolePermissionsDto.role,
      updateRolePermissionsDto.permissions,
    );
  }

  @Get("roles")
  getAllRolePermissions() {
    return this.permissionsService.getAllRolePermissions();
  }
}
