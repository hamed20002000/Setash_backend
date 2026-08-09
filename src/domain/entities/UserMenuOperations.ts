import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

import { MenuOperations } from "./MenuOperations";

@Index("UserMenuOperations_pkey", ["id"], { unique: true })
@Entity("UserMenuOperations", { schema: "public" })
export class UserMenuOperations {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: string;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @ManyToOne(() => Users, (users) => users.userMenuOperations)
  @JoinColumn([{ name: "MainUserId", referencedColumnName: "id" }])
  mainUser: Users;

  @ManyToOne(
    () => MenuOperations,
    (menuOperations) => menuOperations.userMenuOperations
  )
  @JoinColumn([{ name: "MenuOperationId", referencedColumnName: "id" }])
  menuOperation: MenuOperations;

  @ManyToOne(() => Users, (users) => users.userMenuOperations2)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
