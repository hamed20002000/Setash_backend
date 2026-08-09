import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { InvoiceHeaders } from "./InvoiceHeaders";
import { Regions } from "./Regions";
import { Users } from "./Users";
import { ReceiptDetails } from "./ReceiptDetails";
import { WarehouseTransactions } from "./WarehouseTransactions";
import { InvoiceDetails } from "./InvoiceDetails";

@Index("Providers_pkey", ["id"], { unique: true })
@Entity("Providers", { schema: "public" })
export class Providers {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("character varying", { name: "Name", length: 200 })
  name: string;

  @Column("character varying", { name: "Address" })
  address: string;

  @Column("character varying", { name: "Phone", nullable: true })
  phone: string | null;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("boolean", { name: "Firm", nullable: true })
  firm: boolean | null;

 

  @ManyToOne(() => Regions, (regions) => regions.providers)
  @JoinColumn([{ name: "RegionId", referencedColumnName: "id" }])
  region: Regions;

  @ManyToOne(() => Users, (users) => users.providers)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => ReceiptDetails, (receiptDetails) => receiptDetails.provider)
  receiptDetails: ReceiptDetails[];

  @OneToMany(() => InvoiceDetails, (invoiceDetails) => invoiceDetails.provider)
  invoiceDetails: InvoiceDetails[];

  @OneToMany(
    () => WarehouseTransactions,
    (warehouseTransactions) => warehouseTransactions.provider
  )
  warehouseTransactions: WarehouseTransactions[];
}
