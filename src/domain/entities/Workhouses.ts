import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Courses } from "./Courses";
import { Projects } from "./Projects";
import { Stores } from "./Stores";
import { WarehouseDispatchHeaders } from "./WarehouseDispatchHeaders";
import { WorkhouseDetails } from "./WorkhouseDetails";
import { Regions } from "./Regions";
import { Users } from "./Users";
import { Works } from "./Works";
import { InvoiceHeaders } from "./InvoiceHeaders";
import { WorkhouseRents } from "./WorkhouseRents";
import { ConsignedCars } from "./ConsignedCars";
import { OrderHeaders } from "./OrderHeaders";
import { Requests } from "./Requests";

@Index("Workhouses_pkey", ["id"], { unique: true })
@Entity("Workhouses", { schema: "public" })
export class Workhouses {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("character varying", { name: "Name", length: 200 })
  name: string;

  @Column("character varying", { name: "Code", length: 10 })
  code: string;

  @Column("character varying", { name: "Address", nullable: true })
  address: string | null;

  @Column("timestamp with time zone", { name: "EndDate", nullable: true })
  endDate: Date;


  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @OneToMany(() => Courses, (courses) => courses.workhouse)
  courses: Courses[];

  @OneToMany(() => Projects, (projects) => projects.workhouse)
  projects: Projects[];

  @OneToMany(() => Stores, (stores) => stores.workhouse)
  stores: Stores[];

    @OneToMany(() => Requests, (requests) => requests.workhouse)
  requests: Requests[];


  @OneToMany(
    () => WarehouseDispatchHeaders,
    (warehouseDispatchHeaders) => warehouseDispatchHeaders.workhouse
  )
  warehouseDispatchHeaders: WarehouseDispatchHeaders[];

  @OneToMany(
    () => WorkhouseDetails,
    (workhouseDetails) => workhouseDetails.workhouse
  )
  workhouseDetails: WorkhouseDetails[];

  @OneToMany(
    () => WorkhouseRents,
    (workhouseRents) => workhouseRents.workhouse
  )
  workhouseRents: WorkhouseRents[];

  @ManyToOne(() => Regions, (regions) => regions.workhouses)
  @JoinColumn([{ name: "RegionId", referencedColumnName: "id" }])
  region: Regions;

  @ManyToOne(() => Users, (users) => users.workhouses)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Works, (works) => works.workhouses)
  @JoinColumn([{ name: "WorkId", referencedColumnName: "id" }])
  work: Works;

  @OneToMany(() => InvoiceHeaders, (invoiceHeaders) => invoiceHeaders.workhouse)
  invoiceHeaders: InvoiceHeaders[];

  @OneToMany(() => ConsignedCars, (consignedCars) => consignedCars.workhouse)
  consignedCars: ConsignedCars[];

  @OneToMany(() => OrderHeaders, (orderHeaders) => orderHeaders.workhouse)
  orderHeaders: OrderHeaders[];
}
