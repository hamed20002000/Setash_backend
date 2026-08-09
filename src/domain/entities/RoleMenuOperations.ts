import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Roles } from "./Roles";
import { SystemOperations } from "./SystemOperations";
import { Users } from "./Users";
import { MenuOperations } from "./MenuOperations";

@Index("RoleMenuOperations_pkey", ["id"], { unique: true })
@Entity("RoleMenuOperations", { schema: "public" })
export class RoleMenuOperations {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @ManyToOne(() => Roles, (roles) => roles.roleMenuOperations)
  @JoinColumn([{ name: "RoleId", referencedColumnName: "id" }])
  role: Roles;

  @ManyToOne(
    () => MenuOperations,
    (menuOperations) => menuOperations.roleMenuOperations
  )
  @JoinColumn([{ name: "MenuOperationId", referencedColumnName: "id" }])
  menuOperation: MenuOperations;

  @ManyToOne(() => Users, (users) => users.roleMenuOperations)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
