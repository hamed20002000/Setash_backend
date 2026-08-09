import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ChannelRows } from "./ChannelRows";
import { Networks } from "./Networks";
import { Workhouses } from "./Workhouses";
import { TenderHeaders } from "./TenderHeaders";
import { Users } from "./Users";

@Index("Works_pkey", ["id"], { unique: true })
@Entity("Works", { schema: "public" })
export class Works {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("character varying", { name: "Title" })
  title: string;

  @Column("timestamp with time zone", { name: "StartDate", nullable: true })
  startDate: Date | null;

  @Column("timestamp with time zone", { name: "EndDate", nullable: true })
  endDate: Date | null;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @OneToMany(() => ChannelRows, (channelRows) => channelRows.workhouse)
  channelRows: ChannelRows[];

  @OneToMany(() => Networks, (networks) => networks.work)
  networks: Networks[];

  @OneToMany(() => Workhouses, (workhouses) => workhouses.work)
  workhouses: Workhouses[];

  @ManyToOne(() => TenderHeaders, (tenderHeaders) => tenderHeaders.works)
  @JoinColumn([{ name: "TenderId", referencedColumnName: "id" }])
  tender: TenderHeaders;

  @ManyToOne(() => Users, (users) => users.works)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
