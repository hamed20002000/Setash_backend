import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { WarehouseDispatchHeaders } from "./WarehouseDispatchHeaders";
import { Users } from "./Users";

@Index("WarehouseDispatchHeaderStatusHistories_pkey", ["id"], { unique: true })
@Entity("WarehouseDispatchHeaderStatusHistories", { schema: "public" })
export class WarehouseDispatchHeaderStatusHistories {
  @Column("bigint", { primary: true, name: "Id",generated:"increment"})
  id: string;

  @Column("smallint", { name: "Status" })
  status: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;


  @ManyToOne(() => Users, (users) => users.warehouseDispatchHeaderStatusHistories)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @ManyToOne(
    () => WarehouseDispatchHeaders,
    (warehouseDispatchHeaders) =>
      warehouseDispatchHeaders.warehouseDispatchHeaderStatusHistories
  )
  @JoinColumn([
    { name: "WarehouseDispatchHeaderId", referencedColumnName: "id" },
  ])
  warehouseDispatchHeader: WarehouseDispatchHeaders;
}
