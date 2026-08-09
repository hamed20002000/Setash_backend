import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Users } from "./Users";
import { ProjectPlanningImplementation } from "./ProjectPlanningImplementation";

@Index("ForceMajors_pkey", ["id"], { unique: true })
@Entity("ForceMajors", { schema: "public" })
export class ForceMajors {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("character varying", { name: "Title" })
  title: string;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @ManyToOne(() => Users, (users) => users.forceMajors)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(
    () => ProjectPlanningImplementation,
    (projectPlanningImplementation) => projectPlanningImplementation.forceMajor
  )
  projectPlanningImplementations: ProjectPlanningImplementation[];
}
