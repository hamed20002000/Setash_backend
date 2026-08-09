import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ConsignedCars } from "./ConsignedCars";
import { CourseParticipants } from "./CourseParticipants";
import { Leaves } from "./Leaves";
import { PersonnelConsigneds } from "./PersonnelConsigneds";
import { PersonnelWorkPlaces } from "./PersonnelWorkPlaces";
import { Positions } from "./Positions";
import { Users } from "./Users";
import { sex } from "../enums/sex.enum";
import { salaryType } from "../enums/salaryType.enum";
import { salaryAccrualMethod } from "../enums/salaryAccrualMethod.enum";
import { personnelGroup } from "../enums/pesonalGroup.enum";
import { maritalStatus } from "../enums/maritalStatu.enum";
import { bloodType } from "../enums/bloodType.enum";
import { educationStatus } from "../enums/educationStatus.enum";
import { PersonnelSalary } from "./PersonnelSalary";

@Index("Personnels_pkey", ["id"], { unique: true })
@Entity("Personnels", { schema: "public" })
export class Personnels {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("character varying", { name: "ImageSrc", nullable: true })
  imageSrc: string;

  @Column("character varying", { name: "Name", length: 250 })
  name: string;

  @Column("character varying", { name: "Family", length: 250 })
  family: string;

  @Column("character varying", { name: "IdentityNumber", length: 11 })
  identityNumber: string;

  @Column("timestamp with time zone", { name: "WorkStartDate" })
  workStartDate: Date;

  @Column("timestamp with time zone", { name: "WorkEndDate", nullable: true })
  workEndDate: Date | null;

  @Column("character varying", {
    name: "InsuranceNumber",
    nullable: true,
    length: 20,
  })
  insuranceNumber: string | null;

  @Column("smallint", { name: "Sex" })
  sex: sex;

  @Column("smallint", { name: "SalaryType" })
  salaryType: salaryType;



  @Column("smallint", { name: "SalaryAccrualMethod" })
  salaryAccrualMethod: salaryAccrualMethod;

  @Column("money", { name: "Salary", default: 0 })
  salary: number;


  @Column("smallint", { name: "Group" })
  group: personnelGroup;

  @Column("character varying", {
    name: "BirthPlace",
    nullable: true,
    length: 320,
  })
  birthPlace: string | null;

  @Column("timestamp with time zone", { name: "BirthDate" })
  birthDate: Date;

  @Column("smallint", { name: "MaritalStatus", nullable: true })
  maritalStatus: maritalStatus | null;

  @Column("character varying", { name: "FatherName", length: 150 })
  fatherName: string;

  @Column("smallint", { name: "BloodType", nullable: true })
  bloodType: bloodType | null;

  @Column("character varying", { name: "Address" })
  address: string;

  @Column("smallint", { name: "EducationStatus" })
  educationStatus: educationStatus;

  @Column("character varying", { name: "IBAN", nullable: true })
  iban: string | null;

  @Column("character varying", { name: "Telephone", nullable: true })
  telephone: string | null;

  @Column("character varying", { name: "Mobile", nullable: true })
  mobile: string | null;


  @Column("boolean", { name: "HasISG", nullable: true })
  hasISG: boolean;

  @Column("json", { name: "Attachments", nullable: true })
  attachments: object | null;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @OneToMany(() => ConsignedCars, (consignedCars) => consignedCars.personnel)
  consignedCars: ConsignedCars[];

  @OneToMany(
    () => CourseParticipants,
    (courseParticipants) => courseParticipants.personnel
  )
  courseParticipants: CourseParticipants[];

  @OneToMany(() => Leaves, (leaves) => leaves.personnel)
  leaves: Leaves[];

  @OneToMany(
    () => PersonnelConsigneds,
    (personnelConsigneds) => personnelConsigneds.personnel
  )
  personnelConsigneds: PersonnelConsigneds[];

  @OneToMany(
    () => PersonnelWorkPlaces,
    (personnelWorkPlaces) => personnelWorkPlaces.personnel
  )
  personnelWorkPlaces: PersonnelWorkPlaces[];

  @OneToMany(
    () => PersonnelSalary,
    (personnelSalary) => personnelSalary.personnel
  )
  personnelSalaries: PersonnelSalary[];

  @ManyToOne(() => Positions, (positions) => positions.personnels)
  @JoinColumn([{ name: "PositionId", referencedColumnName: "id" }])
  position: Positions;

  @ManyToOne(() => Users, (users) => users.personnels)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
