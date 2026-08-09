import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { InvoiceDetails } from "./InvoiceDetails";
import { WarehouseDispatchDetails } from "./WarehouseDispatchDetails";
import { Providers } from "./Providers";
import { ReceiptHeaders } from "./ReceiptHeaders";
import { StoreDispatchDetails } from "./StoreDispatchDetails";
import { Users } from "./Users";
import { WarehouseTransactions } from "./WarehouseTransactions";
import { Items } from "./Items";

@Index("ReceiptDetails_pkey", ["id"], { unique: true })
@Entity("ReceiptDetails", { schema: "public" })
export class ReceiptDetails {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;


  @Column("numeric", { name: "Quantity", precision: 10, scale: 2 })

  quantity: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("boolean", { name: "Firm", nullable: true })
  firm: boolean | null;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @ManyToOne(() => Items, (items) => items.receiptDetails)
  @JoinColumn([{ name: "ItemId", referencedColumnName: "id" }])
  item: Items;

  @ManyToOne(
    () => InvoiceDetails,
    (invoiceDetails) => invoiceDetails.receiptDetails
  )
  @JoinColumn([{ name: "InvoiceDetailId", referencedColumnName: "id" }])
  invoiceDetail: InvoiceDetails;

  @ManyToOne(
    () => WarehouseDispatchDetails,
    (warehouseDispatchDetails) => warehouseDispatchDetails.receiptDetails
  )
  @JoinColumn([
    { name: "OriginWarehouseDispatchDeatailId", referencedColumnName: "id" },
  ])
  originWarehouseDispatchDeatail: WarehouseDispatchDetails;

  @ManyToOne(() => Providers, (providers) => providers.receiptDetails)
  @JoinColumn([{ name: "ProviderId", referencedColumnName: "id" }])
  provider: Providers;

  @ManyToOne(
    () => ReceiptHeaders,
    (receiptHeaders) => receiptHeaders.receiptDetails
  )
  @JoinColumn([{ name: "ReceiptHeaderId", referencedColumnName: "id" }])
  receiptHeader: ReceiptHeaders;

  @ManyToOne(
    () => StoreDispatchDetails,
    (storeDispatchDetails) => storeDispatchDetails.receiptDetails
  )
  @JoinColumn([{ name: "StoreDispatchDetailId", referencedColumnName: "id" }])
  storeDispatchDetail: StoreDispatchDetails;

  @ManyToOne(() => Users, (users) => users.receiptDetails)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(
    () => WarehouseTransactions,
    (warehouseTransactions) => warehouseTransactions.receiptDetail
  )
  warehouseTransactions: WarehouseTransactions[];
}
