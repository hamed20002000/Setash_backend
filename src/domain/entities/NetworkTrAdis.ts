import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ChannelRowItems } from "./ChannelRowItems";
import { Networks } from "./Networks";
import { ProductTypes } from "./ProductTypes";
import { Projects } from "./Projects";
import { Users } from "./Users";
import { Works } from "./Works";
import { TransmissionRows } from "./TransmissionRows";
import { productStatus } from "../enums/channelrow-product-status.enum";
import { ChannelRows } from "./ChannelRows";

@Index("NetworkTrAdis_pkey", ["id"], { unique: true })
@Entity("NetworkTrAdis", { schema: "public" })
export class NetworkTrAdis {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;



  @Column("character varying", { name: "Title" })
  title: string;





  @ManyToOne(() => Networks, (networks) => networks.networkTrAdis)
  @JoinColumn([{ name: "NetworkId", referencedColumnName: "id" }])
  network: Networks;



  @OneToMany(() => ChannelRows, (channelRows) => channelRows.networkTrAdi)
  channelRows: ChannelRows[];




  @ManyToOne(() => Users, (users) => users.channelRows)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;





}
