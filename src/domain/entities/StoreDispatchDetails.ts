import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ReceiptDetails } from "./ReceiptDetails";
import { Items } from "./Items";
import { StoreDispatchHeaders } from "./StoreDispatchHeaders";
import { Users } from "./Users";
import { StoreReceiptDetails } from "./StoreReceiptDetails";
import { StoreTransactions } from "./StoreTransactions";

@Index("StoreDispatchDetails_pkey", ["id"], { unique: true })
@Entity("StoreDispatchDetails", { schema: "public" })
export class StoreDispatchDetails {
  @Column("bigint", { primary: true, name: "Id",generated:"increment" })
  id: number;
@Column("numeric", { name: "Quantity", precision: 10, scale: 2 })
 
  quantity: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @OneToMany(
    () => ReceiptDetails,
    (receiptDetails) => receiptDetails.storeDispatchDetail
  )
  receiptDetails: ReceiptDetails[];

  @ManyToOne(() => Items, (items) => items.storeDispatchDetails)
  @JoinColumn([{ name: "ItemId", referencedColumnName: "id" }])
  item: Items;

  @ManyToOne(
    () => StoreDispatchHeaders,
    (storeDispatchHeaders) => storeDispatchHeaders.storeDispatchDetails
  )
  @JoinColumn([{ name: "StoreDispatchHeadersId", referencedColumnName: "id" }])
  storeDispatchHeaders: StoreDispatchHeaders;

  @ManyToOne(() => Users, (users) => users.storeDispatchDetails)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(
    () => StoreReceiptDetails,
    (storeReceiptDetails) => storeReceiptDetails.storeDispatchDetail
  )
  storeReceiptDetails: StoreReceiptDetails[];

  @OneToMany(
    () => StoreTransactions,
    (storeTransactions) => storeTransactions.storeDispatchDetail
  )
  storeTransactions: StoreTransactions[];
}
