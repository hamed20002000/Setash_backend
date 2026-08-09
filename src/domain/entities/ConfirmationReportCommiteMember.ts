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
import { CommiteMembers } from "./CommiteMembers";
import { ConfirmationProjectReport } from "./ConfirmationProjectReport";
import { ConfirmationReportCommiteMemberAnswer } from "./ConfirmationReportCommiteMemberAnswer";

@Index("ConfirmationReportCommiteMember_pkey", ["id"], { unique: true })
@Entity("ConfirmationReportCommiteMember", { schema: "public" })
export class ConfirmationReportCommiteMember {
  @Column("bigint", { primary: true, name: "Id",generated:"increment" })
  id: number;
 

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @ManyToOne(() => CommiteMembers, (commiteMembers) => commiteMembers.confirmationReportCommiteMembers)
  @JoinColumn([{ name: "CommiteMembersId", referencedColumnName: "id" }])
  commiteMember: CommiteMembers;

   @ManyToOne(() => ConfirmationProjectReport, (confirmationProjectReport) => confirmationProjectReport.confirmationReportCommiteMembers)
  @JoinColumn([{ name: "ConfirmationProjectReportId", referencedColumnName: "id" }])
  confirmationProjectReport: ConfirmationProjectReport;

   @Column("boolean", { name: "MemberStatus", default: false })
  memberStatus: boolean;

  @ManyToOne(() => Users, (users) => users.drivers)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => ConfirmationReportCommiteMemberAnswer, (confirmationReportCommiteMemberAnswers) => confirmationReportCommiteMemberAnswers.confirmationReportCommiteMember)
  confirmationReportCommiteMemberAnswers: ConfirmationReportCommiteMemberAnswer[];



}
