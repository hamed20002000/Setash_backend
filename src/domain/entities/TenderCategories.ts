import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Items } from "./Items";
import { TenderHeaders } from "./TenderHeaders";
import { Users } from "./Users";
import { TenderDetails } from "./TenderDetails";

@Index("TenderCategories_pkey", ["id"], { unique: true })
@Entity("TenderCategories", { schema: "public" })
export class TenderCategories {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("character varying", { name: "Title", nullable: true })
  title: string;

 @Column("character varying", { name: "EskiPoz", nullable: true })
  eskiPoz: string;
  
  @Column("float", { name: "Percent", nullable: true })
  percent: number;


  @Column("character varying", { name: "Description" ,nullable:true})
  description: string;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @OneToMany(() => TenderDetails, (tenderDetails) => tenderDetails.tenderCategory,{
    cascade: true, // ✅ بدون این، insert جزئیات انجام نمی‌شه!
    eager: false,  // اختیاری
  })
  tenderDetails: TenderDetails[];

  @ManyToOne(
    () => TenderHeaders,
    (tenderHeaders) => tenderHeaders.tenderCategories,{
       onDelete: 'CASCADE',
    }
  )
  @JoinColumn([{ name: "TenderHeaderId", referencedColumnName: "id" }])
  tenderHeader: TenderHeaders;

  @ManyToOne(() => Users, (users) => users.tenderDetails)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
