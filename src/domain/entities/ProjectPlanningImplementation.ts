import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { ForceMajors } from "./ForceMajors";
import { ProjectPlanings } from "./ProjectPlanings";
import { Users } from "./Users";

import { implementsValueObjectDto } from "../helper/value-object";
import { projectImplementationFieldStatus } from "../enums/projectImplementaionFieldStatus";
import { ProjectPlanningImplementationDates } from "./ProjectPlanningImplementaionDates";
import { ChannelRows } from "./ChannelRows";
import { TransmissionRows } from "./TransmissionRows";

@Index("ProjectPlanningImplementation_pkey", ["id"], { unique: true })
@Entity("ProjectPlanningImplementation", { schema: "public" })
export class ProjectPlanningImplementation {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("smallint", { name: "KaziYapilanDirekDurumu", nullable: true })
  kaziYapilanDirekDurumu: projectImplementationFieldStatus | null;

  @Column("smallint", { name: "AltMontajiYapilanDirekDurumu", nullable: true })
  altMontajiYapilanDirekDurumu: projectImplementationFieldStatus | null;

  @Column("smallint", { name: "BetonAtilanDirekDurumu", nullable: true })
  betonAtilanDirekDurumu: projectImplementationFieldStatus | null;

  @Column("smallint", { name: "UstMontajiOrulenDirekDurumu", nullable: true })
  ustMontajiOrulenDirekDurumu: projectImplementationFieldStatus | null;

  @Column("smallint", { name: "UstMontajiKurulanDirekDurumu", nullable: true })
  ustMontajiKurulanDirekDurumu: projectImplementationFieldStatus | null;

  @Column("smallint", { name: "DikilenBetonDirekDurumu", nullable: true })
  dikilenBetonDirekDurumu: projectImplementationFieldStatus | null;

  @Column("smallint", { name: "IletkenCekilenDirekDurumu", nullable: true })
  iletkenCekilenDirekDurumu: projectImplementationFieldStatus | null;

  @Column("smallint", { name: "AyiriciTakilanDirekDurumu", nullable: true })
  ayiriciTakilanDirekDurumu: projectImplementationFieldStatus | null;

  @Column("smallint", { name: "DikilenAydinlatmaDirekDurumu", nullable: true })
  dikilenAydinlatmaDirekDurumu: projectImplementationFieldStatus | null;

  @Column("smallint", { name: "KabloKanaliDurumu", nullable: true })
  kabloKanaliDurumu: projectImplementationFieldStatus | null;

  @Column("float", { name: "CekilenKabloMiktari", nullable: true })
  cekilenKabloMiktari: number | null;

  @Column("smallint", { name: "TransformatorDurumu", nullable: true })
  transformatorDurumu: projectImplementationFieldStatus | null;

  @Column("smallint", { name: "DagitimPanosuDurumu", nullable: true })
  dagitimPanosuDurumu: projectImplementationFieldStatus | null;

  @Column("smallint", { name: "SahaDagitimKutusuDurumu", nullable: true })
  sahaDagTMKutusuDurumu: projectImplementationFieldStatus | null;

  @Column("smallint", { name: "BetonKoskDurumu", nullable: true })
  betonKoskDurumu: projectImplementationFieldStatus | null;

  @Column("smallint", { name: "HucreDurumu", nullable: true })
  hucreDurumu: projectImplementationFieldStatus | null;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  /*  @Column("smallint", { name: "PlanningStatus", nullable: true })
   planningStatus: planningStatus | null; */

  @ManyToOne(
    () => ForceMajors,
    (forceMajors) => forceMajors.projectPlanningImplementations
  )
  @JoinColumn([{ name: "ForceMajorId", referencedColumnName: "id" }])
  forceMajor: ForceMajors;

  @ManyToOne(
    () => ChannelRows,
    (channelRows) => channelRows.projectPlanningImplementations
  )
  @JoinColumn([{ name: "ChannelRowId", referencedColumnName: "id" }])
  channelRow: ChannelRows;

  @ManyToOne(
    () => TransmissionRows,
    (transmissionRows) => transmissionRows.projectPlanningImplementations
  )
  @JoinColumn([{ name: "TransmissionRowId", referencedColumnName: "id" }])
  transmissionRow: TransmissionRows;

  @ManyToOne(() => Users, (users) => users.projectPlanningImplementations)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(
    () => ProjectPlanningImplementationDates,
    (projectPlanningImplementationDates) => projectPlanningImplementationDates.projectPlanningImplementations
  )
  @JoinColumn([{ name: "ProjectPlanningImplementationDateId", referencedColumnName: "id" }])
  projectPlanningImplementationDate: ProjectPlanningImplementationDates;


}
