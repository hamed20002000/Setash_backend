import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Personnels } from "./Personnels";
import { Users } from "./Users";

@Index("PersonnelSalaries_pkey", ["id"], { unique: true })
@Entity("PersonnelSalaries", { schema: "public" })
export class PersonnelSalary {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("money", { name: "Salary", default: 0 })
  salary: number;



  @ManyToOne(() => Personnels, (personnels) => personnels.personnelSalaries)
  @JoinColumn([{ name: "PersonnelId", referencedColumnName: "id" }])
  personnel: Personnels;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;
  @ManyToOne(() => Users, (users) => users.personnelSalaries)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

}
