import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Drivers } from "./Drivers";
import { Users } from "./Users";
import { InvoiceHeaders } from "./InvoiceHeaders";
import { WarehouseDispatchHeaders } from "./WarehouseDispatchHeaders";
import { StoreDispatchHeaders } from "./StoreDispatchHeaders";

@Index("DriverVehicles_pkey", ["id"], { unique: true })
@Entity("DriverVehicles", { schema: "public" })
export class DriverVehicles {
   @Column("bigint", { primary: true, name: "Id", generated: "increment" })
   id: number;

   @Column("character varying", { name: "Name", length: 200 })
   name: string;

   @Column("integer", { name: "Model" })
   model: number;

   @Column("character varying", { name: "Plaque" })
   plaque: string;

   @Column("timestamp with time zone", { name: "CreateAt" })
   createAt: Date;

   @Column("smallint", { name: "RecordStatus" })
   recordStatus: number;

   @ManyToOne(() => Drivers, (drivers) => drivers.driverVehicles)
   @JoinColumn([{ name: "DriverId", referencedColumnName: "id" }])
   driver: Drivers;

   @ManyToOne(() => Users, (users) => users.driverVehicles)
   @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
   user: Users;

   @OneToMany(() => InvoiceHeaders, (invoiceHeaders) => invoiceHeaders.driverVehicle)
   invoiceHeaders: InvoiceHeaders[];
   @OneToMany(() => StoreDispatchHeaders, (storeDispatchHeaders) => storeDispatchHeaders.driverVehicle)
   storeDispatchHeaders: StoreDispatchHeaders[];

   @OneToMany(() => WarehouseDispatchHeaders, (warehouseDispatchHeaders) => warehouseDispatchHeaders.driverVehicle)
   warehouseDispatchHeaders: WarehouseDispatchHeaders[];
}
