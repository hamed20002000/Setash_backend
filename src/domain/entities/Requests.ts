import {

  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { DriverVehicles } from "./DriverVehicles";
import { Users } from "./Users";
import { InvoiceHeaders } from "./InvoiceHeaders";
import { StoreDispatchHeaders } from "./StoreDispatchHeaders";
import { WarehouseDispatchHeaders } from "./WarehouseDispatchHeaders";
import { OrderHeaders } from "./OrderHeaders";
import { recordStatus } from "../enums/recordstatus.enum";
import { requestStatus } from "../enums/requestSatus.enum";
import { RequestStatusHistories } from "./RequestStatusHistories";
import { Workhouses } from "./Workhouses";

@Index("Requests_pkey", ["id"], { unique: true })
@Entity("Requests", { schema: "public" })
export class Requests {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("character varying", { name: "Subject", length: 200 })
  subject: string;

  @Column("character varying", { name: "Description" })
  description: string;

  @Column("json", { name: "Attachments", nullable: true })
  attachments: object | null;

  @Column("smallint", { name: "Status", default: 0 })
  status: requestStatus;

  @Column("character varying", { name: "StatusDescription", nullable: true })
  statusDescription: string | null;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: recordStatus;


  @ManyToOne(() => Users, (users) => users.drivers)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => OrderHeaders, (orderHeaders) => orderHeaders.request)
  orderHeaders: OrderHeaders[];

  @OneToMany(() => RequestStatusHistories, (requestStatusHistories) => requestStatusHistories.request, { cascade: true })
  requestStatusHistories: RequestStatusHistories[];


  @ManyToOne(() => Workhouses, (workhouses) => workhouses.stores)
  @JoinColumn([{ name: "WorkhouseId", referencedColumnName: "id" }])
  workhouse: Workhouses;

}
