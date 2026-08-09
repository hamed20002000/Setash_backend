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
import { projectType } from "../enums/projectType.enum";
import { ConfirmationReportCommiteMember } from "./ConfirmationReportCommiteMember";

@Index("ConfirmationProjectReport_pkey", ["id"], { unique: true })
@Entity("ConfirmationProjectReport", { schema: "public" })
export class ConfirmationProjectReport {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("int", { name: "Year" })
  year: number;

  @Column("character varying", { name: "City", length: 300 })
  city: string;

  @Column("character varying", { name: "Town", length: 300 })
  town: string;
  @Column("character varying", { name: "Region", length: 300 })
  region: string;


  @Column("smallint", { name: "TesisType" })
  tesisType: projectType;


  @Column("character varying", { name: "TrAdi", length: 300 })
  trAdi: string;

  @Column("int", { name: "ProjectCount" })
  projectCount: number;

  @Column("boolean", { name: " GeciciTutanakTeslimAlmaDurumu", default: false })
  Gecici_tutanak_teslim_alma_durumu: boolean;


  @Column("boolean", { name: "KesinTutanakTeslimAlmaDurumu", default: false })
  Kesin_tutanak_teslim_alma_durumu: boolean;


  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;



  @OneToMany(() => ConfirmationReportCommiteMember, (confirmationReportCommiteMembers) => confirmationReportCommiteMembers.confirmationProjectReport)
  confirmationReportCommiteMembers: ConfirmationReportCommiteMember[];


  @ManyToOne(() => Users, (users) => users.drivers)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;


}
