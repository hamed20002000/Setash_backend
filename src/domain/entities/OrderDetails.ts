import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { InvoiceDetails } from "./InvoiceDetails";
import { Items } from "./Items";
import { OrderHeaders } from "./OrderHeaders";
import { Users } from "./Users";

@Index("OrderDetails_pkey", ["id"], { unique: true })
@Entity("OrderDetails", { schema: "public" })
export class OrderDetails {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;
  @Column("numeric", { name: "Quantity", precision: 10, scale: 2 })

  quantity: number;

  @Column("numeric", { name: "Price", precision: 10, scale: 2, nullable: true })
  price: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @OneToMany(
    () => InvoiceDetails,
    (invoiceDetails) => invoiceDetails.orderDetail
  )
  invoiceDetails: InvoiceDetails[];

  @ManyToOne(() => Items, (items) => items.orderDetails)
  @JoinColumn([{ name: "ItemId", referencedColumnName: "id" }])
  item: Items;

  @ManyToOne(() => OrderHeaders, (orderHeaders) => orderHeaders.orderDetails)
  @JoinColumn([{ name: "OrderHeaderId", referencedColumnName: "id" }])
  orderHeader: OrderHeaders;

  @ManyToOne(() => Users, (users) => users.orderDetails)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
