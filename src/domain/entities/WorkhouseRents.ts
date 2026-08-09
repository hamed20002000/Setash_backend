import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Users } from "./Users";
import { Workhouses } from "./Workhouses";
import { Drivers } from "./Drivers";
import { workhouseRentStatus } from "../enums/workhouseRentStatus.enum";
import { WorkhouseRentStatusHistories } from "./WorkkhouseRentStatusHistories";

@Index("WorkhouseRents_pkey", ["id"], { unique: true })
@Entity("WorkhouseRents", { schema: "public" })
export class WorkhouseRents {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("character varying", { name: "Title", length: 200 })
  title: string;

  @Column("character varying", { name: "Description" })
  description: string;

  @Column("character varying", { name: "DriverInfo", nullable: true })
  driverInfo: string | null;

  @Column("money", { name: "Price" })
  price: number;

  @Column("character varying", { name: "Company" })
  company: string;

  @Column("date", { name: "RentStartDate" })
  rentStartDate: Date;

  @Column("date", { name: "RentEndDate" })
  rentEndDate: Date;

  @Column("json", { name: "Attachments", nullable: true })
  attachments: object | null;

  @Column("smallint", { name: "Status" })
  status: workhouseRentStatus;

  @Column("character varying", { name: "StatusDescription", nullable: true })
  statusdescription: string;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @ManyToOne(() => Users, (users) => users.workhouseRents)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Workhouses, (workhouses) => workhouses.workhouseRents)
  @JoinColumn([{ name: "WorkhouseId", referencedColumnName: "id" }])
  workhouse: Workhouses;

  @OneToMany(
    () => WorkhouseRentStatusHistories,
    (workhouseRentStatusHistories) => workhouseRentStatusHistories.workhouseRent, { cascade: true }
  )
  workhouseRentStatusHistories: WorkhouseRentStatusHistories[];

}
