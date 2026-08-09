import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { StoreReceiptDetails } from "./StoreReceiptDetails";
import { Stores } from "./Stores";
import { Users } from "./Users";
import { recordStatus } from "../enums/recordstatus.enum";

@Index("StoreReceiptHeaders_pkey", ["id"], { unique: true })
@Entity("StoreReceiptHeaders", { schema: "public" })
export class StoreReceiptHeaders {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("character varying", { name: "Code", length: 10 })
  code: string;

  @Column("timestamp with time zone", { name: "DocDate" })
  docDate: Date;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

   @Column("bool", { name: "IsEnd" ,nullable:true})
   isEnd: boolean;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: recordStatus;

   @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @OneToMany(
    () => StoreReceiptDetails,
    (storeReceiptDetails) => storeReceiptDetails.storeReceiptHeader, { cascade: true }
  )
  storeReceiptDetails: StoreReceiptDetails[];

  @ManyToOne(() => Stores, (stores) => stores.storeReceiptHeaders)
  @JoinColumn([{ name: "StoreId", referencedColumnName: "id" }])
  store: Stores;

  @ManyToOne(() => Users, (users) => users.storeReceiptHeaders)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
