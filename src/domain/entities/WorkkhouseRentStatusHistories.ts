import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { OrderHeaders } from "./OrderHeaders";
import { Users } from "./Users";
import { orderStatus } from "../enums/orderStatus.enum";
import { requestStatus } from "../enums/requestSatus.enum";
import { Requests } from "./Requests";
import { workhouseRentStatus } from "../enums/workhouseRentStatus.enum";
import { WorkhouseRents } from "./WorkhouseRents";

@Index("WorkhouseRentStatusHistories_pkey", ["id"], { unique: true })
@Entity("WorkhouseRentStatusHistories", { schema: "public" })
export class WorkhouseRentStatusHistories {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("smallint", { name: "Status" })
  status: workhouseRentStatus;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

   @Column("character varying", { name: "StatusDescription" , nullable: true })
  statusDescription: string | null;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @ManyToOne(
    () => WorkhouseRents,
    (workhouseRents) => workhouseRents.workhouseRentStatusHistories
  )
  @JoinColumn([{ name: "WorkhouseRentId", referencedColumnName: "id" }])
  workhouseRent: WorkhouseRents;

  @ManyToOne(() => Users, (users) => users.workhouseRentStatusHistories)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
