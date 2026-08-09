import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { StoreDispatchDetails } from "./StoreDispatchDetails";
import { StoreDispatchHeaderStatusHistories } from "./StoreDispatchHeaderStatusHistories";
import { Stores } from "./Stores";
import { Warehouses } from "./Warehouses";
import { Drivers } from "./Drivers";
import { Users } from "./Users";
import { Projects } from "./Projects";
import { DriverVehicles } from "./DriverVehicles";
import { StoreDispatchStatus } from "../enums/StoreDispatchStatus";

@Index("StoreDispatchHeaders_pkey", ["id"], { unique: true })
@Entity("StoreDispatchHeaders", { schema: "public" })
export class StoreDispatchHeaders {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("character varying", { name: "Code", length: 10 })
  code: string;

  @Column("timestamp with time zone", { name: "DocDate" })
  docDate: Date;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("boolean", { name: "Destruction", nullable: true })
  destruction: boolean | null;

  @Column("smallint", { name: "Status" })
  status: StoreDispatchStatus;

   @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @Column("character varying", { name: "StatusDescription", nullable: true })
  statusDescription: string | null;
  @Column("bool", { name: "IsEnd" ,nullable:true})
   isEnd: boolean;
  @OneToMany(
    () => StoreDispatchDetails,
    (storeDispatchDetails) => storeDispatchDetails.storeDispatchHeaders, { cascade: true }
  )
  storeDispatchDetails: StoreDispatchDetails[];

  @OneToMany(
    () => StoreDispatchHeaderStatusHistories,
    (storeDispatchHeaderStatusHistories) =>
      storeDispatchHeaderStatusHistories.storeDispatchHeader
  )
  storeDispatchHeaderStatusHistories: StoreDispatchHeaderStatusHistories[];

  @ManyToOne(() => Projects, (projects) => projects.storeDispatchHeaders)
  @JoinColumn([{ name: "ProjectId", referencedColumnName: "id" }])
  project: Projects;

  @ManyToOne(() => Stores, (stores) => stores.storeDispatchHeaders)
  @JoinColumn([{ name: "DestinationStoreId", referencedColumnName: "id" }])
  destinationStore: Stores;

  @ManyToOne(() => Warehouses, (warehouses) => warehouses.storeDispatchHeaders)
  @JoinColumn([{ name: "DestinationWarehouseId", referencedColumnName: "id" }])
  destinationWarehouse: Warehouses;

  @ManyToOne(() => Drivers, (drivers) => drivers.storeDispatchHeaders)
  @JoinColumn([{ name: "DriverId", referencedColumnName: "id" }])
  driver: Drivers;

  @ManyToOne(() => DriverVehicles, (driverVehicles) => driverVehicles.invoiceHeaders)
  @JoinColumn([{ name: "DriverVehicleId", referencedColumnName: "id" }])
  driverVehicle: DriverVehicles;

  @ManyToOne(() => Stores, (stores) => stores.storeDispatchHeaders2)
  @JoinColumn([{ name: "StoreId", referencedColumnName: "id" }])
  store: Stores;

  @ManyToOne(() => Users, (users) => users.storeDispatchHeaders)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
