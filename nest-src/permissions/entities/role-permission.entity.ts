import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("role_permissions")
export class RolePermission {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  role: string;

  @Column()
  permissionId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
