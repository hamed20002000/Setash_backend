import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Roles } from "./Roles";
import { SystemOperations } from "./SystemOperations";
import { Users } from "./Users";
import { Menus } from "./Menus";
import { RoleMenuOperations } from "./RoleMenuOperations";
import { UserMenuOperations } from "./UserMenuOperations";

@Index("MenuOperations_pkey", ["id"], { unique: true })
@Entity("MenuOperations", { schema: "public" })
export class MenuOperations {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @ManyToOne(() => Menus, (menus) => menus.menuOperations)
  @JoinColumn([{ name: "MenuId", referencedColumnName: "id" }])
  menu: Menus;

  @ManyToOne(() => SystemOperations, (systemOperations) => systemOperations.menuOperations)
  @JoinColumn([{ name: "SystemOperationId", referencedColumnName: "id" }])
  systemOperation: SystemOperations;

  @OneToMany(
    () => RoleMenuOperations,
    (roleMenuOperations) => roleMenuOperations.role
  )
  roleMenuOperations: RoleMenuOperations[];

    @OneToMany(
    () =>UserMenuOperations,
    (userMenuOperations) => userMenuOperations.mainUser
  )
  userMenuOperations: UserMenuOperations[];

  @ManyToOne(() => Users, (users) => users.roleMenuOperations)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
