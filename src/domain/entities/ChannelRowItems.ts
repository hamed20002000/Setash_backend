import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { ChannelRows } from "./ChannelRows";
import { Items } from "./Items";
import { Users } from "./Users";

@Index("ChannelRowItems_pkey", ["id"], { unique: true })
@Entity("ChannelRowItems", { schema: "public" })
export class ChannelRowItems {
  @Column("bigint", { primary: true, name: "Id",generated:"increment" })
  id: number;
@Column("numeric", { name: "Value", precision: 10, scale: 2 })
 
  value: number | null;

   @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus", nullable: true })
  recordStatus: number | null;

  @ManyToOne(() => ChannelRows, (channelRows) => channelRows.channelRowItems)
  @JoinColumn([{ name: "ChannelRowId", referencedColumnName: "id" }])
  channelRow: ChannelRows;

  @ManyToOne(() => Items, (items) => items.channelRowItems)
  @JoinColumn([{ name: "ItemId", referencedColumnName: "id" }])
  item: Items;

  @ManyToOne(() => Users, (users) => users.channelRowItems)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
