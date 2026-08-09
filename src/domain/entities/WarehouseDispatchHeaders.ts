import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { WarehouseDispatchDetails } from "./WarehouseDispatchDetails";
import { WarehouseDispatchHeaderStatusHistories } from "./WarehouseDispatchHeaderStatusHistories";
import { Warehouses } from "./Warehouses";
import { Drivers } from "./Drivers";
import { Users } from "./Users";
import { Workhouses } from "./Workhouses";
import { WarehouseDispatchStatus } from "../enums/warehouseDispatchStatus.enum";
import { DriverVehicles } from "./DriverVehicles";

@Index("WarehouseDispatchHeaders_pkey", ["id"], { unique: true })
@Entity("WarehouseDispatchHeaders", { schema: "public" })
export class WarehouseDispatchHeaders {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("character varying", { name: "Code", length: 10 })
  code: string;

  @Column("timestamp with time zone", { name: "DocDate" })
  docDate: Date;

  @Column("boolean", { name: "DestructionStatus",nullable:true })
  destructionStatus: boolean;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;
  @Column("bool", { name: "IsEnd" ,nullable:true})
   isEnd: boolean;
  @Column("smallint", { name: "Status" })
  status: WarehouseDispatchStatus;

  @Column("character varying", { name: "StatusDescription", nullable: true })
  statusDescription: string | null;

   @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @OneToMany(
    () => WarehouseDispatchDetails,
    (warehouseDispatchDetails) =>
      warehouseDispatchDetails.warehouseDispatchHeaders, { cascade: true }
  )
  warehouseDispatchDetails: WarehouseDispatchDetails[];

  @OneToMany(
    () => WarehouseDispatchHeaderStatusHistories,
    (warehouseDispatchHeaderStatusHistories) =>
      warehouseDispatchHeaderStatusHistories.warehouseDispatchHeader
  )
  warehouseDispatchHeaderStatusHistories: WarehouseDispatchHeaderStatusHistories[];

  @ManyToOne(
    () => Warehouses,
    (warehouses) => warehouses.warehouseDispatchHeaders
  )
  @JoinColumn([{ name: "DestinationWarehouseId", referencedColumnName: "id" }])
  destinationWarehouse: Warehouses;

  @ManyToOne(() => Drivers, (drivers) => drivers.warehouseDispatchHeaders)
  @JoinColumn([{ name: "DriverId", referencedColumnName: "id" }])
  driver: Drivers;

  @ManyToOne(() => DriverVehicles, (driverVehicles) => driverVehicles.invoiceHeaders)
  @JoinColumn([{ name: "DriverVehicleId", referencedColumnName: "id" }])
  driverVehicle: DriverVehicles;

  @ManyToOne(() => Users, (users) => users.warehouseDispatchHeaders)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(
    () => Warehouses,
    (warehouses) => warehouses.warehouseDispatchHeaders2
  )
  @JoinColumn([{ name: "WarehouseId", referencedColumnName: "id" }])
  warehouse: Warehouses;

  @ManyToOne(
    () => Workhouses,
    (workhouses) => workhouses.warehouseDispatchHeaders
  )
  @JoinColumn([{ name: "WorkhouseId", referencedColumnName: "id" }])
  workhouse: Workhouses;
}
