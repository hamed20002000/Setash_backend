import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ChannelRowItems } from "./ChannelRowItems";
import { InvoiceDetails } from "./InvoiceDetails";
import { Categories } from "./Categories";
import { ItemUnits } from "./ItemUnits";
import { Users } from "./Users";
import { OrderDetails } from "./OrderDetails";
import { StoreDispatchDetails } from "./StoreDispatchDetails";
import { StoreReceiptDetails } from "./StoreReceiptDetails";
import { StoreTransactions } from "./StoreTransactions";
import { TenderDetails } from "./TenderDetails";
import { TransmissionRowItmes } from "./TransmissionRowItmes";
import { WarehouseDispatchDetails } from "./WarehouseDispatchDetails";
import { WarehouseTransactions } from "./WarehouseTransactions";
import { TransmissionSummary } from "./TransmissionSummary";
import { ReceiptDetails } from "./ReceiptDetails";

@Index("Items_pkey", ["id"], { unique: true })
@Entity("Items", { schema: "public" })
export class Items {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("character varying", { name: "Name" })
  name: string;
  @Column("character varying", { name: "Code", length: 200, nullable: true })
  code: string;
  @Column("numeric", { name: "weghit", precision: 10, scale: 2, nullable: true })
  weghit: number;
  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("character varying", { name: "Abbreviation", length: 4, nullable: true })
  abbreviation: string;

  @OneToMany(() => ChannelRowItems, (channelRowItems) => channelRowItems.item)
  channelRowItems: ChannelRowItems[];

  @OneToMany(() => InvoiceDetails, (invoiceDetails) => invoiceDetails.item)
  invoiceDetails: InvoiceDetails[];

  @OneToMany(() => ReceiptDetails, (receiptDetails) => receiptDetails.item)
  receiptDetails: ReceiptDetails[];

  @ManyToOne(() => Categories, (categories) => categories.items)
  @JoinColumn([{ name: "CategoryId", referencedColumnName: "id" }])
  category: Categories;

  @ManyToOne(() => ItemUnits, (itemUnits) => itemUnits.items)
  @JoinColumn([{ name: "UnitId", referencedColumnName: "id" }])
  unit: ItemUnits;

  @ManyToOne(() => Users, (users) => users.items)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.item)
  orderDetails: OrderDetails[];

  @OneToMany(
    () => StoreDispatchDetails,
    (storeDispatchDetails) => storeDispatchDetails.item
  )
  storeDispatchDetails: StoreDispatchDetails[];

  @OneToMany(
    () => StoreReceiptDetails,
    (storeReceiptDetails) => storeReceiptDetails.item
  )
  storeReceiptDetails: StoreReceiptDetails[];

  @OneToMany(
    () => StoreTransactions,
    (storeTransactions) => storeTransactions.item
  )
  storeTransactions: StoreTransactions[];

  @OneToMany(() => TenderDetails, (tenderDetails) => tenderDetails.item)
  tenderDetails: TenderDetails[];

  @OneToMany(
    () => TransmissionRowItmes,
    (transmissionRowItmes) => transmissionRowItmes.item
  )
  transmissionRowItmes: TransmissionRowItmes[];

  @OneToMany(
    () => WarehouseDispatchDetails,
    (warehouseDispatchDetails) => warehouseDispatchDetails.item
  )
  warehouseDispatchDetails: WarehouseDispatchDetails[];

  @OneToMany(
    () => WarehouseTransactions,
    (warehouseTransactions) => warehouseTransactions.item
  )
  warehouseTransactions: WarehouseTransactions[];

  @OneToMany(
    () => TransmissionSummary,
    (transmissionSummary) => transmissionSummary.item
  )
  transmissionSummary: TransmissionSummary[];
}
