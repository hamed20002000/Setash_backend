import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { Regions } from "./Regions";
import { Users } from "./Users";
import { recordStatus } from "../enums/recordstatus.enum";
import { CarWarehouseDetails } from "./CarWarehouseDetails";

@Index("CarWarehouses_pkey", ["id"], { unique: true })
@Entity("CarWarehouses", { schema: "public" })
export class CarWarehouses {
  @Column("bigint", { primary: true, name: "Id",generated:"increment" })
  id: number;

  @Column("character varying", { name: "Name", length: 200 })
  name: string;

  @Column("character varying", { name: "Code", length: 10 })
  code: string;

  @Column("character varying", { name: "Address" })
  address: string;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: recordStatus;

  @OneToMany(
    () => CarWarehouseDetails,
    (carWarehouseDetails) => carWarehouseDetails.carWarehouse
  )
  carWarehouseDetails: CarWarehouseDetails[];

  @ManyToOne(() => Regions, (regions) => regions.carWarehouses)
  @JoinColumn([{ name: "RegionId", referencedColumnName: "id" }])
  region: Regions;

  @ManyToOne(() => Users, (users) => users.carWarehouses)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
