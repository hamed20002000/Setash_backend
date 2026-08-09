import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Projects } from "./Projects";
import { Users } from "./Users";
import { ProjectPlanningImplementation } from "./ProjectPlanningImplementation";
import { ValueObjectDto } from "../helper/value-object";
import { ProjectPlanningImplementationDates } from "./ProjectPlanningImplementaionDates";

@Index("ProjectPlanings_pkey", ["id"], { unique: true })
@Entity("ProjectPlanings", { schema: "public" })
export class ProjectPlanings {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("timestamp with time zone", { name: "StartDate" })
  startDate: Date;

  @Column("timestamp with time zone", { name: "EndDate" })
  endDate: Date;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("json", { name: "KaziYapilanDirekSayisi", nullable: true })
  kaziYapilanDirekSayisi: ValueObjectDto | null;

  @Column("json", { name: "AltMontajiYapilanDirekSayisi", nullable: true })
  altMontajiYapilanDirekSayisi: ValueObjectDto | null;

  @Column("json", { name: "BetonAtilanDirekSayisi", nullable: true })
  betonAtilanDirekSayisi: ValueObjectDto | null;

  @Column("json", { name: "UstMontajiOrulenDirekSayisi", nullable: true })
  ustMontajiOrulenDirekSayisi: ValueObjectDto | null;

  @Column("json", { name: "UstMontajiKurulanDirekSayisi", nullable: true })
  ustMontajiKurulanDirekSayisi: ValueObjectDto | null;

  @Column("json", { name: "DikilenBetonDirekSayisi", nullable: true })
  dikilenBetonDirekSayisi: ValueObjectDto | null;

  @Column("json", { name: "IletkenCekilenDirekSayisi", nullable: true })
  iletkenCekilenDirekSayisi: ValueObjectDto | null;

  @Column("json", { name: "AyiriciTakilanDirekSayisi", nullable: true })
  ayiriciTakilanDirekSayisi: ValueObjectDto | null;

  @Column("json", { name: "DikilenAydinlatmaDirekSayisi", nullable: true })
  dikilenAydinlatmaDirekSayisi: ValueObjectDto | null;

  @Column("json", { name: "KabloKanali", nullable: true })
  kabloKanali: ValueObjectDto | null;

  @Column("json", { name: "CekilenKabloMiktari", nullable: true })
  cekilenKabloMiktari: ValueObjectDto | null;

  @Column("json", { name: "Transformator", nullable: true })
  transformator: ValueObjectDto | null;

  @Column("json", { name: "DagitimPanosu", nullable: true })
  dagitimPanosu: ValueObjectDto | null;

  @Column("json", { name: "SahaDagıtımKutusu", nullable: true })
  sahaDagTMKutusu: ValueObjectDto | null;

  @Column("json", { name: "BetonKosk", nullable: true })
  betonKosk: ValueObjectDto | null;

  @Column("json", { name: "Hucre", nullable: true })
  hucre: ValueObjectDto  | null;

  @ManyToOne(() => Projects, (projects) => projects.projectPlanings)
  @JoinColumn([{ name: "ProjectId", referencedColumnName: "id" }])
  project: Projects;

  @ManyToOne(() => Users, (users) => users.projectPlanings)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(
    () => ProjectPlanningImplementationDates,
    (ProjectPlanningImplementationDate) =>
      ProjectPlanningImplementationDate.projectPlanning
  )
  projectPlanningImplementationDate: ProjectPlanningImplementationDates[];
}
