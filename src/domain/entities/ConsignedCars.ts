import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CarFuels } from "./CarFuels";

import { Personnels } from "./Personnels";
import { Users } from "./Users";
import { CarWarehouseDetails } from "./CarWarehouseDetails";
import { Workhouses } from "./Workhouses";

@Index("ConsignedCars_pkey", ["id"], { unique: true })
@Entity("ConsignedCars", { schema: "public" })
export class ConsignedCars {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("timestamp with time zone", { name: "Date" })
  date: Date;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("boolean", { name: "Consigned" })
  consigned: boolean;

  @Column("json", { name: "Attachments" })
  attachments: object;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @Column("integer", { name: "Kilometer" })
  kilometer: number;

  @OneToMany(() => CarFuels, (carFuels) => carFuels.consignedCar)
  carFuels: CarFuels[];

  @ManyToOne(
    () => CarWarehouseDetails,
    (carWarehouseDetails) => carWarehouseDetails.consignedCars
  )
  @JoinColumn([{ name: "CarWarehouseDetailId", referencedColumnName: "id" }])
  carWarehouseDetail: CarWarehouseDetails;

  @ManyToOne(() => Personnels, (personnels) => personnels.consignedCars)
  @JoinColumn([{ name: "PersonnelId", referencedColumnName: "id" }])
  personnel: Personnels;

  @ManyToOne(() => Workhouses, (workhouses) => workhouses.consignedCars)
  @JoinColumn([{ name: "WorkhouseId", referencedColumnName: "id" }])
  workhouse: Workhouses;

  @ManyToOne(() => Users, (users) => users.consignedCars)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
