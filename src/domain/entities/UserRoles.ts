import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { PersonnelWorkPlaces } from "./PersonnelWorkPlaces";
import { Users } from "./Users";
import { Roles } from "./Roles";


@Index("UserRoles_pkey", ["id"], { unique: true })
@Entity("UserRoles", { schema: "public" })
export class UserRoles {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: string;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @OneToMany(
    () => PersonnelWorkPlaces,
    (personnelWorkPlaces) => personnelWorkPlaces.userRole
  )
  personnelWorkPlaces: PersonnelWorkPlaces[];

  @ManyToOne(() => Users, (users) => users.userRoles)
  @JoinColumn([{ name: "AssigendUserId", referencedColumnName: "id" }])
  assigendUser: Users;

  @ManyToOne(() => Roles, (roles) => roles.userRoles)
  @JoinColumn([{ name: "RoleId", referencedColumnName: "id" }])
  role: Roles;

  @ManyToOne(() => Users, (users) => users.userRoles2)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
