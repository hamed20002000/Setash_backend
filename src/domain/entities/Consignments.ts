import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Users } from "./Users";
import { PersonnelConsigneds } from "./PersonnelConsigneds";
import { WorkPlaceType } from "../enums/workPlaceType.enum";

@Index("Consignments_pkey", ["id"], { unique: true })
@Index("IX_Consignments_Code", ["code"], { unique: true })
@Entity("Consignments", { schema: "public" })
export class Consignments {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("character varying", { name: "Code" })
  code: string;
  @Column("character varying", { name: "Description",nullable:true })
  description: string| null;

  @Column("bigint", { name: "PlaceId", nullable: true })
  placeId: number | null;

  @Column("smallint", { name: "PlaceType", nullable: true })
  placeType: WorkPlaceType | null;

  @Column("json", { name: "Attachments", nullable: true })
  attachments: object | null;


  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @ManyToOne(() => Users, (users) => users.consignments)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(
    () => PersonnelConsigneds,
    (personnelConsigneds) => personnelConsigneds.consignment
  )
  personnelConsigneds: PersonnelConsigneds[];
}
