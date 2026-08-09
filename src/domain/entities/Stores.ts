import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { StoreDispatchHeaders } from "./StoreDispatchHeaders";
import { StoreReceiptHeaders } from "./StoreReceiptHeaders";
import { StoreTransactions } from "./StoreTransactions";
import { Regions } from "./Regions";
import { Users } from "./Users";
import { Workhouses } from "./Workhouses";
import { InvoiceHeaders } from "./InvoiceHeaders";

@Index("Stores_pkey", ["id"], { unique: true })
@Entity("Stores", { schema: "public" })
export class Stores {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("character varying", { name: "Name", length: 150 })
  name: string;

  @Column("character varying", { name: "Code", length: 10 })
  code: string;

  @Column("character varying", { name: "Address" })
  address: string;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @OneToMany(
    () => StoreDispatchHeaders,
    (storeDispatchHeaders) => storeDispatchHeaders.destinationStore
  )
  storeDispatchHeaders: StoreDispatchHeaders[];

  @OneToMany(
    () => StoreDispatchHeaders,
    (storeDispatchHeaders) => storeDispatchHeaders.store
  )
  storeDispatchHeaders2: StoreDispatchHeaders[];

  @OneToMany(
    () => StoreReceiptHeaders,
    (storeReceiptHeaders) => storeReceiptHeaders.store
  )
  storeReceiptHeaders: StoreReceiptHeaders[];

  @OneToMany(
    () => StoreTransactions,
    (storeTransactions) => storeTransactions.store
  )
  storeTransactions: StoreTransactions[];



  @ManyToOne(() => Regions, (regions) => regions.stores)
  @JoinColumn([{ name: "RegionId", referencedColumnName: "id" }])
  region: Regions;

  @ManyToOne(() => Users, (users) => users.stores)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Workhouses, (workhouses) => workhouses.stores)
  @JoinColumn([{ name: "WorkhouseId", referencedColumnName: "id" }])
  workhouse: Workhouses;
}
