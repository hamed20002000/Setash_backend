import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { TenderDetails } from "./TenderDetails";
import { Users } from "./Users";
import { Works } from "./Works";
import { TenderCategories } from "./TenderCategories";
import { tenderStatus } from "../enums/tenderstatus.enum";

@Index("TenderHeaders_pkey", ["id"], { unique: true })
@Entity("TenderHeaders", { schema: "public" })
export class TenderHeaders {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("character varying", { name: "Title" })
  title: string;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("smallint", { name: "Status", nullable: true })
  status: tenderStatus | null;

  @Column("timestamp with time zone", { name: "StatusDate", nullable: true })
  statusDate: Date | null;

  @Column("json", { name: "Attachments", nullable: true })
  attachments: object | null;
  @OneToMany(() => TenderCategories, (tenderCategories) => tenderCategories.tenderHeader,{
    cascade: true, // ✅ بدون این، insert جزئیات انجام نمی‌شه!
    eager: false,  // اختیاری
  })
  tenderCategories: TenderCategories[];

  @ManyToOne(() => Users, (users) => users.tenderHeaders)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => Works, (works) => works.tender)
  works: Works[];
}
