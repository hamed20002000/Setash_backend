import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ReceiptDetails } from "./ReceiptDetails";
import { Users } from "./Users";
import { Warehouses } from "./Warehouses";
import { recordStatus } from "../enums/recordstatus.enum";

@Index("ReceiptHeaders_pkey", ["id"], { unique: true })
@Entity("ReceiptHeaders", { schema: "public" })
export class ReceiptHeaders {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("character varying", { name: "Code", length: 10 })
  code: string;
   @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @Column("timestamp with time zone", { name: "DocDate" })
  docDate: Date;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: recordStatus;
  @Column("bool", { name: "IsEnd" ,nullable:true})
   isEnd: boolean;
  @OneToMany(
    () => ReceiptDetails,
    (receiptDetails) => receiptDetails.receiptHeader, { cascade: true }
  )
  receiptDetails: ReceiptDetails[];

  @ManyToOne(() => Users, (users) => users.receiptHeaders)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Warehouses, (warehouses) => warehouses.receiptHeaders)
  @JoinColumn([{ name: "WarehouseId", referencedColumnName: "id" }])
  warehouse: Warehouses;
}
