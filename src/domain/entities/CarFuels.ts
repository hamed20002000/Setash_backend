import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { ConsignedCars } from "./ConsignedCars";
import { Users } from "./Users";

@Index("CarFuels_pkey", ["id"], { unique: true })
@Entity("CarFuels", { schema: "public" })
export class CarFuels {
  @Column("bigint", { primary: true, name: "Id",generated:"increment" })
  id: number;

  @Column("timestamp with time zone", { name: "Date" })
  date: Date;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("character varying", { name: "FuelType" })
  fuelType: string;

  @Column("smallint", { name: "Amount" })
  amount: number;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @Column("money", { name: "Fee" })
  fee: number;

  @Column("money", { name: "TotatPrice" })
  totatPrice: number;

  @Column("json", { name: "Attachment", nullable: true })
  attachment: object | null;

  @ManyToOne(() => ConsignedCars, (consignedCars) => consignedCars.carFuels)
  @JoinColumn([{ name: "ConsignedCarId", referencedColumnName: "id" }])
  consignedCar: ConsignedCars;

  @ManyToOne(() => Users, (users) => users.carFuels)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
