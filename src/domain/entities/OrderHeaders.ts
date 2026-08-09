import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { OrderDetails } from "./OrderDetails";
import { OrderHeaderStatusHistories } from "./OrderHeaderStatusHistories";
import { Networks } from "./Networks";
import { Users } from "./Users";
import { orderStatus } from "../enums/orderStatus.enum";
import { Requests } from "./Requests";
import { recordStatus } from "../enums/recordstatus.enum";
import { Workhouses } from "./Workhouses";

@Index("OrderHeaders_pkey", ["id"], { unique: true })
@Entity("OrderHeaders", { schema: "public" })
export class OrderHeaders {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("timestamp with time zone", { name: "DocDate" })
  docDate: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: recordStatus;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "Status" })
  status: orderStatus;

  @Column("bool", { name: "IsEnd", nullable: true })
  isEnd: boolean;

   @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.orderHeader, { cascade: true })
  orderDetails: OrderDetails[];

  @OneToMany(
    () => OrderHeaderStatusHistories,
    (orderHeaderStatusHistories) => orderHeaderStatusHistories.orderHeader
  )
  orderHeaderStatusHistories: OrderHeaderStatusHistories[];

  @ManyToOne(() => Networks, (networks) => networks.orderHeaders)
  @JoinColumn([{ name: "NetworkId", referencedColumnName: "id" }])
  network: Networks;

   @ManyToOne(() => Workhouses, (workhouses) => workhouses.orderHeaders)
  @JoinColumn([{ name: "WorkhouseId", referencedColumnName: "id" }])
  workhouse: Workhouses;

  @ManyToOne(() => Users, (users) => users.orderHeaders)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

   @ManyToOne(() => Requests, (requests) => requests.orderHeaders)
  @JoinColumn([{ name: "RequestId", referencedColumnName: "id" }])
  request: Requests;
}
