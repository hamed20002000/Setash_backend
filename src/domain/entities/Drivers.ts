import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { DriverVehicles } from "./DriverVehicles";
import { Users } from "./Users";
import { InvoiceHeaders } from "./InvoiceHeaders";
import { StoreDispatchHeaders } from "./StoreDispatchHeaders";
import { WarehouseDispatchHeaders } from "./WarehouseDispatchHeaders";

@Index("Drivers_pkey", ["id"], { unique: true })
@Entity("Drivers", { schema: "public" })
export class Drivers {
  @Column("bigint", { primary: true, name: "Id",generated:"increment" })
  id: number;

  @Column("character varying", { name: "Name", length: 200 })
  name: string;

  @Column("character varying", { name: "Family", length: 200 })
  family: string;

  @Column("timestamp with time zone", { name: "Birthdate", nullable: true })
  birthdate: Date | null;

  @Column("character varying", { name: "FatherName", nullable: true })
  fatherName: string | null;

  @Column("character varying", { name: "IdentityNo", length: 11 })
  identityNo: string;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("boolean", { name: "Internal" })
  internal: boolean;

  @OneToMany(() => DriverVehicles, (driverVehicles) => driverVehicles.driver)
  driverVehicles: DriverVehicles[];

  @ManyToOne(() => Users, (users) => users.drivers)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => InvoiceHeaders, (invoiceHeaders) => invoiceHeaders.driver)
  invoiceHeaders: InvoiceHeaders[];

  @OneToMany(
    () => StoreDispatchHeaders,
    (storeDispatchHeaders) => storeDispatchHeaders.driver
  )
  storeDispatchHeaders: StoreDispatchHeaders[];

  @OneToMany(
    () => WarehouseDispatchHeaders,
    (warehouseDispatchHeaders) => warehouseDispatchHeaders.driver
  )
  warehouseDispatchHeaders: WarehouseDispatchHeaders[];
}
