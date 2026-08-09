import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Leaves } from "./Leaves";
import { Users } from "./Users";
import { leaveStatus } from "../enums/leaveStatus.enum";

@Index("LeaveHistories_pkey", ["id"], { unique: true })
@Entity("LeaveHistories", { schema: "public" })
export class LeaveHistories {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

   @Column("smallint", { name: "Status" })
    status: leaveStatus;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @ManyToOne(() => Leaves, (leaves) => leaves.leaveHistories)
  @JoinColumn([{ name: "LeaveId", referencedColumnName: "id" }])
  leave: Leaves;

  @ManyToOne(() => Users, (users) => users.leaveHistories)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
