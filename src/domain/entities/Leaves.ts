import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { LeaveHistories } from "./LeaveHistories";
import { Personnels } from "./Personnels";
import { Users } from "./Users";
import { leaveStatus } from "../enums/leaveStatus.enum";
import { leaveType } from "../enums/leaveType.enum";

@Index("Leaves_pkey", ["id"], { unique: true })
@Entity("Leaves", { schema: "public" })
export class Leaves {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("smallint", { name: "Type" })
  type: leaveType;
  @Column("timestamp with time zone", { name: "StartDate" })
  startDate: Date;

  @Column("timestamp with time zone", { name: "EndDate" })
  endDate: Date;

  @Column("smallint", { name: "Status" })
  status: leaveStatus;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @OneToMany(() => LeaveHistories, (leaveHistories) => leaveHistories.leave)
  leaveHistories: LeaveHistories[];

  @ManyToOne(() => Personnels, (personnels) => personnels.leaves)
  @JoinColumn([{ name: "PersonnelId", referencedColumnName: "id" }])
  personnel: Personnels;

  @ManyToOne(() => Users, (users) => users.leaves)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
