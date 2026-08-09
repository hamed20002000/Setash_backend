import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ChannelRows } from "./ChannelRows";
import { ProjectPlanings } from "./ProjectPlanings";
import { ProjectFirms } from "./ProjectFirms";
import { Users } from "./Users";
import { Workhouses } from "./Workhouses";
import { StoreDispatchHeaders } from "./StoreDispatchHeaders";
import { projectType } from "../enums/projectType.enum";

@Index("Projects_pkey", ["id"], { unique: true })
@Entity("Projects", { schema: "public" })
export class Projects {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("character varying", { name: "Title" })
  title: string;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("timestamp with time zone", { name: "StartDate", nullable: true })
  startDate: Date | null;

  @Column("timestamp with time zone", {
    name: "PredictEndDate",
    nullable: true,
  })
  predictEndDate: Date | null;

  @Column("timestamp with time zone", { name: "EndDate", nullable: true })
  endDate: Date | null;

  @Column("smallint", { name: "Type", nullable: true })
  type: projectType | null;

  @Column("character varying", { name: "Code", nullable: true, length: 20 })
  code: string | null;

  @OneToMany(() => ChannelRows, (channelRows) => channelRows.project)
  channelRows: ChannelRows[];



  @OneToMany(
    () => ProjectPlanings,
    (projectPlanings) => projectPlanings.project
  )
  projectPlanings: ProjectPlanings[];

  @ManyToOne(() => ProjectFirms, (projectFirms) => projectFirms.projects)
  @JoinColumn([{ name: "ProjectFirmId", referencedColumnName: "id" }])
  projectFirm: ProjectFirms;

  @ManyToOne(() => Users, (users) => users.projects)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Workhouses, (workhouses) => workhouses.projects)
  @JoinColumn([{ name: "WorkhouseId", referencedColumnName: "id" }])
  workhouse: Workhouses;

    @OneToMany(
      () => StoreDispatchHeaders,
      (storeDispatchHeaders) => storeDispatchHeaders.destinationWarehouse
    )
    storeDispatchHeaders: StoreDispatchHeaders[];
}
