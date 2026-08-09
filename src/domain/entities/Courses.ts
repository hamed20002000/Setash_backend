import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CourseParticipants } from "./CourseParticipants";
import { Teachers } from "./Teachers";
import { Users } from "./Users";
import { Workhouses } from "./Workhouses";
import { CourseDateTimes } from "./CourseDateTimes";

@Index("Courses_pkey", ["id"], { unique: true })
@Entity("Courses", { schema: "public" })
export class Courses {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("character varying", { name: "Title" })
  title: string;

  @Column("boolean", { name: "ISG", default: false })
  ISG: boolean;

  @Column("float", { name: "Hours", default: 0 })
  hours: number;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @Column("timestamp with time zone", { name: "StartDateTime" })
  startDateTime: Date;

  @Column("timestamp with time zone", { name: "EndDateTime", nullable: true })
  endDateTime: Date | null;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("json", { name: "Attachments" })
  attachments: object;

  @OneToMany(
    () => CourseDateTimes,
    (courseDateTimes) => courseDateTimes.course
  )
  courseDateTimes: CourseDateTimes[];

  @ManyToOne(() => Teachers, (teachers) => teachers.courses)
  @JoinColumn([{ name: "TeacherId", referencedColumnName: "id" }])
  teacher: Teachers;

  @ManyToOne(() => Users, (users) => users.courses)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Workhouses, (workhouses) => workhouses.courses)
  @JoinColumn([{ name: "WorkhouseId", referencedColumnName: "id" }])
  workhouse: Workhouses;
}
