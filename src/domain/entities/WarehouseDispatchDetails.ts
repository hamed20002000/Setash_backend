import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ReceiptDetails } from "./ReceiptDetails";
import { StoreReceiptDetails } from "./StoreReceiptDetails";
import { Items } from "./Items";
import { Users } from "./Users";
import { WarehouseDispatchHeaders } from "./WarehouseDispatchHeaders";
import { WarehouseTransactions } from "./WarehouseTransactions";

@Index("WarehouseDispatchDetails_pkey", ["id"], { unique: true })
@Entity("WarehouseDispatchDetails", { schema: "public" })
export class WarehouseDispatchDetails {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("numeric", { name: "Quantity", precision: 10, scale: 2 })
  quantity: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @OneToMany(
    () => ReceiptDetails,
    (receiptDetails) => receiptDetails.originWarehouseDispatchDeatail
  )
  receiptDetails: ReceiptDetails[];

  @OneToMany(
    () => StoreReceiptDetails,
    (storeReceiptDetails) => storeReceiptDetails.warehouseDispatchDetail
  )
  storeReceiptDetails: StoreReceiptDetails[];

  @ManyToOne(() => Items, (items) => items.warehouseDispatchDetails)
  @JoinColumn([{ name: "ItemId", referencedColumnName: "id" }])
  item: Items;

  @ManyToOne(() => Users, (users) => users.warehouseDispatchDetails)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(
    () => WarehouseDispatchHeaders,
    (warehouseDispatchHeaders) =>
      warehouseDispatchHeaders.warehouseDispatchDetails
  )
  @JoinColumn([
    { name: "WarehouseDispatchHeadersId", referencedColumnName: "id" },
  ])
  warehouseDispatchHeaders: WarehouseDispatchHeaders;

  @OneToMany(
    () => WarehouseTransactions,
    (warehouseTransactions) => warehouseTransactions.warehouseDispatchDetail
  )
  warehouseTransactions: WarehouseTransactions[];
}
