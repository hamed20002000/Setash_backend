import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { Users } from "./Users";
import { MenuOperations } from "./MenuOperations";

@Index("SystemOperations_pkey", ["id"], { unique: true })
@Entity("SystemOperations", { schema: "public" })
export class SystemOperations {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;



  @ManyToOne(() => Users, (users) => users.systemOperations)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;



    @OneToMany(
      () => MenuOperations,
      (menuOperations) => menuOperations.menu
    )
    menuOperations: MenuOperations[];
}
