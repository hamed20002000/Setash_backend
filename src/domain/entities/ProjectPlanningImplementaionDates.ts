import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ForceMajors } from "./ForceMajors";
import { ProjectPlanings } from "./ProjectPlanings";
import { Users } from "./Users";

import { implementsValueObjectDto } from "../helper/value-object";
import { ProjectPlanningImplementation } from "./ProjectPlanningImplementation";

@Index("ProjectPlanningImplementationDates_pkey", ["id"], { unique: true })
@Entity("ProjectPlanningImplementationDates", { schema: "public" })
export class ProjectPlanningImplementationDates {
  @Column("bigint", { primary: true, name: "Id",generated:"increment" })
  id: number;

  @Column("timestamp with time zone", { name: "StartDate" })
  startDate: Date;

  @Column("timestamp with time zone", { name: "EndDate" })
  endDate: Date;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;
 

  @ManyToOne(
    () => ForceMajors,
    (forceMajors) => forceMajors.projectPlanningImplementations
  )
  @JoinColumn([{ name: "ForceMajorId", referencedColumnName: "id" }])
  forceMajor: ForceMajors;

  @ManyToOne(
    () => ProjectPlanings,
    (projectPlanings) => projectPlanings.projectPlanningImplementationDate
  )
  @JoinColumn([{ name: "ProjectPlanningId", referencedColumnName: "id" }])
  projectPlanning: ProjectPlanings;

  @ManyToOne(() => Users, (users) => users.projectPlanningImplementations)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

   @OneToMany(
      () => ProjectPlanningImplementation,
      (projectPlanningImplementation) =>
        projectPlanningImplementation.projectPlanningImplementationDate
    )
    projectPlanningImplementations: ProjectPlanningImplementation[];
}
