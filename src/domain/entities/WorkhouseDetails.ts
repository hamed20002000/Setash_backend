import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { Workhouses } from "./Workhouses";

@Index("WorkhouseDetails_pkey", ["id"], { unique: true })
@Entity("WorkhouseDetails", { schema: "public" })
export class WorkhouseDetails {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("character varying", { name: "Owner", length: 200,nullable: true })
  owner: string| null;;

  @Column("timestamp with time zone", { name: "RentStartDate",nullable: true })
  rentStartDate: Date| null;;

  @Column("timestamp with time zone", { name: "RentEndDate",nullable: true })
  rentEndDate: Date| null;;

  @Column("money", { name: "Price",nullable: true })
  price: number| null;;

  @Column("jsonb", { name: "Subscription" })
  subscription: { no: string; owner: string; title: string }[];

   

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @Column("json", { name: "Attachments", nullable: true })
  attachments: object | null;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @ManyToOne(() => Users, (users) => users.workhouseDetails)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Workhouses, (workhouses) => workhouses.workhouseDetails)
  @JoinColumn([{ name: "WorkhouseId", referencedColumnName: "id" }])
  workhouse: Workhouses;
}
