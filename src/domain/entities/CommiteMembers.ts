import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { Users } from "./Users";

import { CommiteMemberPosition } from "../enums/commiteMember.enum";
import { ConfirmationReportCommiteMember } from "./ConfirmationReportCommiteMember";

@Index("CommiteMembers_pkey", ["id"], { unique: true })
@Entity("CommiteMembers", { schema: "public" })
export class CommiteMembers {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("character varying", { name: "Name", length: 200 })
  name: string;

  @Column("character varying", { name: "Family", length: 200 })
  family: string;

  @Column("int", { name: "Position" })
  position: CommiteMemberPosition;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @ManyToOne(() => Users, (users) => users.commiteMembers)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;


  @OneToMany(() => ConfirmationReportCommiteMember, (confirmationReportCommiteMembers) => confirmationReportCommiteMembers.commiteMember)
  confirmationReportCommiteMembers: ConfirmationReportCommiteMember[];


}
