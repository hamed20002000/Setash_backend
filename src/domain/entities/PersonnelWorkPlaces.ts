import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Personnels } from "./Personnels";
import { Positions } from "./Positions";
import { Users } from "./Users";
import { UserRoles } from "./UserRoles";

import { Rollcalls } from "./Rollcalls";
import { WorkPlaceType } from "../enums/workPlaceType.enum";

@Index("PersonnelWorkPlaces_pkey", ["id"], { unique: true })
@Entity("PersonnelWorkPlaces", { schema: "public" })
export class PersonnelWorkPlaces {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("bigint", { name: "PlaceId" })
  placeId: number;

  @Column("bigint", { name: "Type" })
  type: WorkPlaceType;

  @Column("money", { name: "Salary" ,default: 0})
  salary: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("timestamp with time zone", { name: "StartDate" })
  startDate: Date;

  @Column("timestamp with time zone", { name: "EndDate", nullable: true })
  endDate: Date | null;

  @Column("character varying", {
    name: "Description",
    nullable: true,
  })
  description: string | null;

  @ManyToOne(() => Personnels, (personnels) => personnels.personnelWorkPlaces)
  @JoinColumn([{ name: "PersonnelId", referencedColumnName: "id" }])
  personnel: Personnels;

  @ManyToOne(() => Positions, (positions) => positions.personnelWorkPlaces)
  @JoinColumn([{ name: "PositionId", referencedColumnName: "id" }])
  position: Positions;

  @ManyToOne(() => Users, (users) => users.personnelWorkPlaces)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => UserRoles, (userRoles) => userRoles.personnelWorkPlaces)
  @JoinColumn([{ name: "UserRoleId", referencedColumnName: "id" }])
  userRole: UserRoles;

  @OneToMany(() => Rollcalls, (rollcalls) => rollcalls.personnelWorkPlace)
  rollcalls: Rollcalls[];
}
