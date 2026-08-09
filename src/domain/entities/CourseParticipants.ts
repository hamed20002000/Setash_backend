import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Courses } from "./Courses";
import { Personnels } from "./Personnels";
import { Users } from "./Users";
import { CourseDateTimes } from "./CourseDateTimes";

@Index("CourseParticipants_pkey", ["id"], { unique: true })
@Entity("CourseParticipants", { schema: "public" })
export class CourseParticipants {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("boolean", { name: "IsParticipated" })
  isParticipated: boolean;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;


  @ManyToOne(() => CourseDateTimes, (courseDateTimes) => courseDateTimes.courseParticipants)
  @JoinColumn([{ name: "CourseDateTimeId", referencedColumnName: "id" }])
  courseDateTime: CourseDateTimes;


  @ManyToOne(() => Personnels, (personnels) => personnels.courseParticipants)
  @JoinColumn([{ name: "PersonnelId", referencedColumnName: "id" }])
  personnel: Personnels;

  @ManyToOne(() => Users, (users) => users.courseParticipants)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
