import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Users } from "./Users";
import { Projects } from "./Projects";

@Index("ProjectFirms_pkey", ["id"], { unique: true })
@Entity("ProjectFirms", { schema: "public" })
export class ProjectFirms {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id:number;

  @Column("character varying", { name: "Ttitle" })
  title: string;

  @Column("character varying", { name: "Abbreviation" })
  abbreviation: string;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @ManyToOne(() => Users, (users) => users.projectFirms)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => Projects, (projects) => projects.projectFirm)
  projects: Projects[];
}
