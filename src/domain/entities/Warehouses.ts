import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { StoreDispatchHeaders } from "./StoreDispatchHeaders";
import { WarehouseDispatchHeaders } from "./WarehouseDispatchHeaders";
import { WarehouseTransactions } from "./WarehouseTransactions";
import { Regions } from "./Regions";
import { Users } from "./Users";
import { InvoiceHeaders } from "./InvoiceHeaders";
import { ReceiptHeaders } from "./ReceiptHeaders";

@Index("Warehouses_pkey", ["id"], { unique: true })
@Index("Warehouses_Code_key", ["code"], { unique: true })
@Entity("Warehouses", { schema: "public" })
export class Warehouses {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("character varying", { name: "Name", length: 150 })
  name: string;

  @Column("character varying", { name: "Code", length: 10 })
  code: string;

  @Column("character varying", { name: "Address" })
  address: string;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @OneToMany(() => InvoiceHeaders, (invoiceHeaders) => invoiceHeaders.warehouse)
  invoiceHeaders: InvoiceHeaders[];

  @OneToMany(() => ReceiptHeaders, (receiptHeaders) => receiptHeaders.warehouse)
  receiptHeaders: ReceiptHeaders[];

  @OneToMany(
    () => StoreDispatchHeaders,
    (storeDispatchHeaders) => storeDispatchHeaders.destinationWarehouse
  )
  storeDispatchHeaders: StoreDispatchHeaders[];

  @OneToMany(
    () => WarehouseDispatchHeaders,
    (warehouseDispatchHeaders) => warehouseDispatchHeaders.destinationWarehouse
  )
  warehouseDispatchHeaders: WarehouseDispatchHeaders[];

  @OneToMany(
    () => WarehouseDispatchHeaders,
    (warehouseDispatchHeaders) => warehouseDispatchHeaders.warehouse
  )
  warehouseDispatchHeaders2: WarehouseDispatchHeaders[];

  @OneToMany(
    () => WarehouseTransactions,
    (warehouseTransactions) => warehouseTransactions.warehouse
  )
  warehouseTransactions: WarehouseTransactions[];

  @ManyToOne(() => Regions, (regions) => regions.warehouses)
  @JoinColumn([{ name: "RegionId", referencedColumnName: "id" }])
  region: Regions;

  @ManyToOne(() => Users, (users) => users.warehouses)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
