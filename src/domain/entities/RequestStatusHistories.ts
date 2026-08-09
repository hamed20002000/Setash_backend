import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { OrderHeaders } from "./OrderHeaders";
import { Users } from "./Users";
import { orderStatus } from "../enums/orderStatus.enum";
import { requestStatus } from "../enums/requestSatus.enum";
import { Requests } from "./Requests";

@Index("RequestStatusHistories_pkey", ["id"], { unique: true })
@Entity("RequestStatusHistories", { schema: "public" })
export class RequestStatusHistories {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("smallint", { name: "Status" })
  status: requestStatus;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

   @Column("character varying", { name: "StatusDescription" , nullable: true })
  statusDescription: string | null;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @ManyToOne(
    () => Requests,
    (requests) => requests.requestStatusHistories
  )
  @JoinColumn([{ name: "RequestId", referencedColumnName: "id" }])
  request: Requests;

  @ManyToOne(() => Users, (users) => users.requestStatusHistories)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
