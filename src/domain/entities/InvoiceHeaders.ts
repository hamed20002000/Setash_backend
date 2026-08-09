import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { InvoiceDetails } from "./InvoiceDetails";
import { InvoiceHeaderStatusHistories } from "./InvoiceHeaderStatusHistories";
import { Drivers } from "./Drivers";
import { Providers } from "./Providers";
import { Users } from "./Users";
import { invoiceStatus } from "../enums/invoiceStatus.enum";
import { recordStatus } from "../enums/recordstatus.enum";
import { DriverVehicles } from "./DriverVehicles";
import { Warehouses } from "./Warehouses";
import { Stores } from "./Stores";
import { Workhouses } from "./Workhouses";

@Index("InvoiceHeaders_pkey", ["id"], { unique: true })
@Entity("InvoiceHeaders", { schema: "public" })
export class InvoiceHeaders {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("character varying", { name: "InvoiceNo", nullable: true })
  invoiceNo: string | null;

  @Column("timestamp with time zone", { name: "DocDate" })
  docDate: Date;

  @Column("money", { name: "TotalPrice" })
  totalPrice: number;

  @Column("money", { name: "TotalNetPrice" })
  totalNetPrice: number;

  @Column("money", { name: "TotalDiscount" })
  totalDiscount: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: recordStatus;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @Column("smallint", { name: "Status" })
  status: invoiceStatus;

  @Column("character varying", { name: "StatusDescription", nullable: true })
  statusDescription: string | null;
  @Column("bool", { name: "IsEnd", nullable: true })
  isEnd: boolean;
  @OneToMany(
    () => InvoiceDetails,
    (invoiceDetails) => invoiceDetails.invoiceHeader, { cascade: true }
  )
  invoiceDetails: InvoiceDetails[];

  @OneToMany(
    () => InvoiceHeaderStatusHistories,
    (invoiceHeaderStatusHistories) => invoiceHeaderStatusHistories.invoiceHeader
  )
  invoiceHeaderStatusHistories: InvoiceHeaderStatusHistories[];

  @ManyToOne(() => Drivers, (drivers) => drivers.invoiceHeaders)
  @JoinColumn([{ name: "DriverId", referencedColumnName: "id" }])
  driver: Drivers;

  @ManyToOne(() => DriverVehicles, (driverVehicles) => driverVehicles.invoiceHeaders)
  @JoinColumn([{ name: "DriverVehicleId", referencedColumnName: "id" }])
  driverVehicle: DriverVehicles;

  @ManyToOne(() => Users, (users) => users.invoiceHeaders)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Warehouses, (warehouses) => warehouses.invoiceHeaders)
  @JoinColumn([{ name: "WarehouseId", referencedColumnName: "id" }])
  warehouse: Warehouses;

  @ManyToOne(() => Workhouses, (workhouse) => workhouse.invoiceHeaders)
  @JoinColumn([{ name: "WorkHouseId", referencedColumnName: "id" }])
  workhouse: Workhouses;
}
