import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,

} from "typeorm";
import { Users } from "./Users";

import { ConfirmationReportCommiteMember } from "./ConfirmationReportCommiteMember";
import { CommiteAnswer } from "../enums/commiteMember.enum";

@Index("ConfirmationReportCommiteMemberAnswer_pkey", ["id"], { unique: true })
@Entity("ConfirmationReportCommiteMemberAnswer", { schema: "public" })
export class ConfirmationReportCommiteMemberAnswer {
  @Column("bigint", { primary: true, name: "Id",generated:"increment" })
  id: number;

  @Column("smallint", { name: "Answer" ,default: CommiteAnswer.IMZADA})
  answer: CommiteAnswer; 

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;


  @ManyToOne(() => ConfirmationReportCommiteMember, (confirmationReportCommiteMember) => confirmationReportCommiteMember.confirmationReportCommiteMemberAnswers)
  @JoinColumn([{ name: "ConfirmationReportCommiteMemberId", referencedColumnName: "id" }])
  confirmationReportCommiteMember: ConfirmationReportCommiteMember; 


  @ManyToOne(() => Users, (users) => users.drivers)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;





}
