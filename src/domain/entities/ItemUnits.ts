import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Users } from "./Users";
import { Items } from "./Items";

@Index("ItemUnits_pkey", ["id"], { unique: true })
@Entity("ItemUnits", { schema: "public" })
export class ItemUnits {
  @Column("bigint", { primary: true, name: "Id",generated:"increment" })
  id: number;

  @Column("character varying", { name: "Title" })
  title: string;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @ManyToOne(() => Users, (users) => users.itemUnits)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => Items, (items) => items.unit)
  items: Items[];
}
