import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Items } from "./Items";
import { TransmissionRows } from "./TransmissionRows";
import { Users } from "./Users";

@Index("TransmissionRowItmes_pkey", ["id"], { unique: true })
@Entity("TransmissionRowItmes", { schema: "public" })
export class TransmissionRowItmes {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

 @Column("numeric", { name: "Value", precision: 10, scale: 2 })
  value: number | null;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus", nullable: true })
  recordStatus: number | null;

  @ManyToOne(() => Items, (items) => items.transmissionRowItmes)
  @JoinColumn([{ name: "ItemId", referencedColumnName: "id" }])
  item: Items;

  @ManyToOne(
    () => TransmissionRows,
    (transmissionRows) => transmissionRows.transmissionRowItmes
  )
  @JoinColumn([{ name: "TransmissionRowId", referencedColumnName: "id" }])
  transmissionRow: TransmissionRows;

  @ManyToOne(() => Users, (users) => users.transmissionRowItmes)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
