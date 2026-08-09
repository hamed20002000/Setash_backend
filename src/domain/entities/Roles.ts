import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { Users } from "./Users";
import { UserRoles } from "./UserRoles";
import { RoleMenuOperations } from "./RoleMenuOperations";
import { RoleNotificationLists } from "./RoleNotificationLists";

@Index("Roles_pkey", ["id"], { unique: true })
@Entity("Roles", { schema: "public" })
export class Roles {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @OneToMany(
    () => RoleMenuOperations,
    (roleMenuOperations) => roleMenuOperations.role
  )
  roleMenuOperations: RoleMenuOperations[];

  @OneToMany(
    () => RoleNotificationLists,
    (roleNotificationLists) => roleNotificationLists.role
  )
  roleNotificationLists: RoleNotificationLists[];

  @ManyToOne(() => Users, (users) => users.roles)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => UserRoles, (userRoles) => userRoles.role)
  userRoles: UserRoles[];
}
