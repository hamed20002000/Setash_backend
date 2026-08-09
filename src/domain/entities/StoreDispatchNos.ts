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

@Index("StoreDispatchNos_pkey", ["id"], { unique: true })
@Entity("StoreDispatchNos", { schema: "public" })
export class StoreDispatchNo {
  @Column("bigint", { primary: true, name: "Id",generated:"increment" })
  id: string;

  @Column("bigint", { name: "No" })
  no:number;     

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @ManyToOne(() => Users, (users) => users.courses)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

}
