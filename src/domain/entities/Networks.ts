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
import { Works } from "./Works";
import { OrderHeaders } from "./OrderHeaders";
import { TransmissionRows } from "./TransmissionRows";
import { NetworkTrAdis } from "./NetworkTrAdis";
import { TransmissionSummary } from "./TransmissionSummary";

@Index("Networks_pkey", ["id"], { unique: true })
@Entity("Networks", { schema: "public" })
export class Networks {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus", nullable: true })
  recordStatus: number | null;
  @Column("character varying", { name: "Title" })
  title: string ;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @OneToMany(() => NetworkTrAdis, (networkTrAdi) => networkTrAdi.network)
  networkTrAdis: NetworkTrAdis[];

  @ManyToOne(() => Users, (users) => users.networks)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Works, (works) => works.networks)
  @JoinColumn([{ name: "WorkId", referencedColumnName: "id" }])
  work: Works;

  @OneToMany(() => OrderHeaders, (orderHeaders) => orderHeaders.network)
  orderHeaders: OrderHeaders[];

  @OneToMany(
    () => TransmissionRows,
    (transmissionRows) => transmissionRows.network
  )
  transmissionRows: TransmissionRows[];

   @OneToMany(
    () => TransmissionSummary,
    (transmissionSummary) => transmissionSummary.network
  )
  transmissionSummary: TransmissionSummary[];
}
