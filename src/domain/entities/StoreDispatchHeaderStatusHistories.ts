import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { StoreDispatchHeaders } from "./StoreDispatchHeaders";
import { Users } from "./Users";
import { StoreDispatchStatus } from "../enums/StoreDispatchStatus";

@Index("StoreDispatchHeaderStatusHistories_pkey", ["id"], { unique: true })
@Entity("StoreDispatchHeaderStatusHistories", { schema: "public" })
export class StoreDispatchHeaderStatusHistories {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: string;

  @Column("smallint", { name: "Status" })
  status: StoreDispatchStatus;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @ManyToOne(
    () => StoreDispatchHeaders,
    (storeDispatchHeaders) =>
      storeDispatchHeaders.storeDispatchHeaderStatusHistories
  )
  @JoinColumn([{ name: "StoreDispatchHeaderId", referencedColumnName: "id" }])
  storeDispatchHeader: StoreDispatchHeaders;

  @ManyToOne(() => Users, (users) => users.storeDispatchHeaderStatusHistories)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
