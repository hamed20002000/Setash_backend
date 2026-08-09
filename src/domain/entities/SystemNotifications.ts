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

@Index("SystemNotifications_pkey", ["id"], { unique: true })
@Entity("SystemNotifications", { schema: "public" })
export class SystemNotifications {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("character varying", { name: "Role" })
  role: string;
  

  @Column("uuid", { name: "UserId", nullable: true })
  userId?: string;


  @Column("character varying", { name: "Type" })
  type: string;

  @Column("character varying", { name: "IdValue", nullable: true })
  idValue: string | null;

  @Column("numeric", { name: "WarehouseId", nullable: true })
  warehouseId: number | null;

  @Column("numeric", { name: "StoreId", nullable: true })
  storeId: number | null;

  @Column("numeric", { name: "ProjectId", nullable: true })
  projectId: number | null;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;


}
