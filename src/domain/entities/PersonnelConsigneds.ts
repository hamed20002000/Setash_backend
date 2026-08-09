import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Consignments } from "./Consignments";
import { Personnels } from "./Personnels";
import { Users } from "./Users";

@Index("PersonnelConsigneds_pkey", ["id"], { unique: true })
@Entity("PersonnelConsigneds", { schema: "public" })
export class PersonnelConsigneds {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("timestamp with time zone", { name: "AssignmentDate", nullable: true })
  assignmentDate: Date | null;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @Column("timestamp with time zone", { name: "ReturnDate", nullable: true })
  returnDate: Date | null;

  @Column("json", { name: "Attachments", nullable: true })
  attachments: object | null;
  

  @ManyToOne(
    () => Consignments,
    (consignments) => consignments.personnelConsigneds
  )
  @JoinColumn([{ name: "ConsignmentId", referencedColumnName: "id" }])
  consignment: Consignments;

  @ManyToOne(
    () => PersonnelConsigneds,
    (personnelConsigneds) => personnelConsigneds.personnelConsigneds
  )
  @JoinColumn([{ name: "ParentId", referencedColumnName: "id" }])
  parent: PersonnelConsigneds;

  @OneToMany(
    () => PersonnelConsigneds,
    (personnelConsigneds) => personnelConsigneds.parent
  )
  personnelConsigneds: PersonnelConsigneds[];

  @ManyToOne(() => Personnels, (personnels) => personnels.personnelConsigneds)
  @JoinColumn([{ name: "PersonnelId", referencedColumnName: "id" }])
  personnel: Personnels;

  @ManyToOne(() => Users, (users) => users.personnelConsigneds)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
