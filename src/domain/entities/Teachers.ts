import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Courses } from "./Courses";
import { Users } from "./Users";

@Index("Teachers_pkey", ["id"], { unique: true })
@Entity("Teachers", { schema: "public" })
export class Teachers {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("character varying", { name: "Surname" })
  surname: string;

  @Column("character varying", { name: "Field", nullable: true })
  field: string | null;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @OneToMany(() => Courses, (courses) => courses.teacher)
  courses: Courses[];

  @ManyToOne(() => Users, (users) => users.teachers)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
