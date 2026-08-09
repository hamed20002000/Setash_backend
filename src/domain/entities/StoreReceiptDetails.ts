import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Items } from "./Items";
import { StoreDispatchDetails } from "./StoreDispatchDetails";
import { StoreReceiptHeaders } from "./StoreReceiptHeaders";
import { Users } from "./Users";
import { WarehouseDispatchDetails } from "./WarehouseDispatchDetails";
import { StoreTransactions } from "./StoreTransactions";
import { InvoiceDetails } from "./InvoiceDetails";

@Index("StoreReceiptDetails_pkey", ["id"], { unique: true })
@Entity("StoreReceiptDetails", { schema: "public" })
export class StoreReceiptDetails {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: string;
  @Column("numeric", { name: "Quantity", precision: 10, scale: 2 })

  quantity: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("boolean", { name: "Destruction", nullable: true })
  destruction: boolean | null;

  @Column("json", { name: "Attachments", nullable: true })
  attachments: object | null;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @ManyToOne(() => Items, (items) => items.storeReceiptDetails)
  @JoinColumn([{ name: "ItemId", referencedColumnName: "id" }])
  item: Items;

  @ManyToOne(
    () => StoreDispatchDetails,
    (storeDispatchDetails) => storeDispatchDetails.storeReceiptDetails
  )
  @JoinColumn([{ name: "StoreDispatchDetailId", referencedColumnName: "id" }])
  storeDispatchDetail: StoreDispatchDetails;

  @ManyToOne(
    () => StoreReceiptHeaders,
    (storeReceiptHeaders) => storeReceiptHeaders.storeReceiptDetails
  )
  @JoinColumn([{ name: "StoreReceiptHeaderId", referencedColumnName: "id" }])
  storeReceiptHeader: StoreReceiptHeaders;

  @ManyToOne(() => Users, (users) => users.storeReceiptDetails)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(
    () => WarehouseDispatchDetails,
    (warehouseDispatchDetails) => warehouseDispatchDetails.storeReceiptDetails
  )
  @JoinColumn([
    { name: "WarehouseDispatchDetailId", referencedColumnName: "id" },
  ])
  warehouseDispatchDetail: WarehouseDispatchDetails;

  @OneToMany(
    () => StoreTransactions,
    (storeTransactions) => storeTransactions.storeReceiptDetail
  )
  storeTransactions: StoreTransactions[];

    @ManyToOne(
    () => StoreDispatchDetails,
    (storeDispatchDetails) => storeDispatchDetails.receiptDetails
  )
  @JoinColumn([
    { name: "OriginStoreDispatchDetailId", referencedColumnName: "id" },
  ])
  originStoreDispatchDetail: StoreDispatchDetails;

     @ManyToOne(
    () => InvoiceDetails,
    (invoiceDetails) => invoiceDetails.storeReceiptDetails
  )
  @JoinColumn([
    { name: "InvoiceDetailId", referencedColumnName: "id" },
  ])
  invoiceDetail: InvoiceDetails;
}
