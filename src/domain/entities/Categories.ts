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

@Index("Categories_pkey", ["id"], { unique: true })
@Tree("closure-table")
@Entity("Categories", { schema: "public" })
export class Categories {
  @PrimaryGeneratedColumn("increment", { type: "bigint", name: "id" })
  id: number; // بهتره string نباشه چون bigint است

  @Column("character varying", { name: "Code", length: 200,nullable:true })
  code: string;
  
  @Column("character varying", { name: "Name", length: 200 })
  name: string;

  @Column("smallint", { name: "Depth" })
  depth: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @TreeParent()
  @JoinColumn([{ name: "ParentId", referencedColumnName: "id" }])
  parent: Categories;

  @TreeChildren()
  categories: Categories[];

  // روابط دیگر
  @ManyToOne(() => Users, (users) => users.categories)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => Items, (items) => items.category)
  items: Items[];
}
