import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { PersonnelWorkPlaces } from "./PersonnelWorkPlaces";
import { Users } from "./Users";

@Index("Rollcalls_pkey", ["id"], { unique: true })
@Entity("Rollcalls", { schema: "public" })
export class Rollcalls {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("timestamp with time zone", { name: "Date" })
  date: Date;

  @Column("time without time zone", { name: "StartTime", nullable: true })
  startTime: string | null;

  @Column("time without time zone", { name: "EndTime", nullable: true })
  endTime: string | null;

  @Column("boolean", { name: "Absence", default:false })
  absence: boolean;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @ManyToOne(
    () => PersonnelWorkPlaces,
    (personnelWorkPlaces) => personnelWorkPlaces.rollcalls
  )
  @JoinColumn([{ name: "PersonnelWorkPlaceId", referencedColumnName: "id" }])
  personnelWorkPlace: PersonnelWorkPlaces;

  @ManyToOne(() => Users, (users) => users.rollcalls)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
