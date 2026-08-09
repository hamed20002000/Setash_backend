import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { OrderHeaders } from "./OrderHeaders";
import { Users } from "./Users";
import { orderStatus } from "../enums/orderStatus.enum";

@Index("OrderHeaderStatusHistories_pkey", ["id"], { unique: true })
@Entity("OrderHeaderStatusHistories", { schema: "public" })
export class OrderHeaderStatusHistories {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("smallint", { name: "Status" })
  status: orderStatus;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @ManyToOne(
    () => OrderHeaders,
    (orderHeaders) => orderHeaders.orderHeaderStatusHistories
  )
  @JoinColumn([{ name: "OrderHeaderId", referencedColumnName: "id" }])
  orderHeader: OrderHeaders;

  @ManyToOne(() => Users, (users) => users.orderHeaderStatusHistories)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
