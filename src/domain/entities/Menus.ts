import {
  Column,
  Entity,
  Index,
  Tree,
  TreeChildren,
  TreeParent,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from "typeorm";
import { Users } from "./Users";
import { Items } from "./Items";
import { MenuOperations } from "./MenuOperations";

@Index("Menus_pkey", ["id"], { unique: true })
@Tree("closure-table")
@Entity("Menus", { schema: "public" })
export class Menus {
  @PrimaryGeneratedColumn("increment", { type: "bigint", name: "id" })
  id: number; // بهتره string نباشه چون bigint است

  @Column("character varying", { name: "Name", length: 200 })
  name: string;
 @Column("character varying", { name: "Icon", nullable: true })
  icon: string;
  @Column("character varying", { name: "URL", length: 200, nullable: true })
  url: string;

  @Column("smallint", { name: "Depth" })
  depth: number;

  @Column("smallint", { name: "Order" })
  order: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @TreeParent()
  @JoinColumn([{ name: "ParentId", referencedColumnName: "id" }])
  parent: Menus;

  @TreeChildren()
  menus: Menus[];

  // روابط دیگر
  @ManyToOne(() => Users, (users) => users.menus)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(
    () => MenuOperations,
    (menuOperations) => menuOperations.menu
  )
  menuOperations: MenuOperations[];

}
