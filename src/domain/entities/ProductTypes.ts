import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ChannelRows } from "./ChannelRows";
import { Users } from "./Users";
import { ProductType } from "../enums/productType-type.enum";

@Index("ProductTypes_pkey", ["id"], { unique: true })
@Entity("ProductTypes", { schema: "public" })
export class ProductTypes {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("smallint", { name: "Type", nullable: true })
  type: ProductType | null;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @OneToMany(() => ChannelRows, (channelRows) => channelRows.productType)
  channelRows: ChannelRows[];

  @ManyToOne(() => Users, (users) => users.productTypes)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
