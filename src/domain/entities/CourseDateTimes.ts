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
import { Courses } from "./Courses";

@Index("CourseDateTimes_pkey", ["id"], { unique: true })
@Entity("CourseDateTimes", { schema: "public" })
export class CourseDateTimes {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;


  @Column("timestamp with time zone", { name: "StartDateTime" })
  startDateTime: Date;

  @Column("timestamp with time zone", { name: "EndDateTime", nullable: true })
  endDateTime: Date | null;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @OneToMany(
    () => CourseParticipants,
    (courseParticipants) => courseParticipants.courseDateTime
  )
  courseParticipants: CourseParticipants[];

  @ManyToOne(() => Courses, (courses) => courses.courseDateTimes)
  @JoinColumn([{ name: "CourseId", referencedColumnName: "id" }])
  course: Courses;

  @ManyToOne(() => Users, (users) => users.courses)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;


}
