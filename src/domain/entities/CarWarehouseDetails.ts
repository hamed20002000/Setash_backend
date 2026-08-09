import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Users } from "./Users";
import { ConsignedCars } from "./ConsignedCars";
import { CarWarehouses } from "./CarWarehouses";

@Index("CarWarehouseDetails_pkey", ["id"], { unique: true })
@Entity("CarWarehouseDetails", { schema: "public" })
export class CarWarehouseDetails {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("character varying", { name: "Brand", length: 200 })
  brand: string;

  @Column("character varying", { name: "Model" })
  model: string;

  @Column("timestamp with time zone", { name: "ManufactureDate" })
  manufactureDate: Date;

  @Column("character varying", { name: "FuelType" , nullable: true })
  fuelType: string| null;

  @Column("character varying", { name: "Plaque" })
  plaque: string;

  @Column("json", { name: "Attacments" })
  attacments: object;

  @Column("character varying", { name: "Description" })
  description: string;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("boolean", { name: "Available" })
  available: boolean;

  @ManyToOne(
    () => CarWarehouses,
    (carWarehouses) => carWarehouses.carWarehouseDetails
  )
  @JoinColumn([{ name: "CarWarehouseId", referencedColumnName: "id" }])
  carWarehouse: CarWarehouses;
  @ManyToOne(() => Users, (users) => users.carWarehouseDetails)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(
    () => ConsignedCars,
    (consignedCars) => consignedCars.carWarehouseDetail
  )
  consignedCars: ConsignedCars[];
}
