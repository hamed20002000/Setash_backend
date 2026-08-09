import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { Items } from "./Items";
import { StoreDispatchDetails } from "./StoreDispatchDetails";
import { Stores } from "./Stores";
import { StoreReceiptDetails } from "./StoreReceiptDetails";
import { WarehouseOperations } from "../enums/warehouse-op.enum";

@Index("StoreTransactions_pkey", ["id"], { unique: true })
@Entity("StoreTransactions", { schema: "public" })
export class StoreTransactions {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: string;
  @Column("numeric", { name: "Quantity", precision: 10, scale: 2 })

  quantity: number;

  @Column("smallint", { name: "Operation" })
  operation: WarehouseOperations;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @Column("boolean", { name: "Destruction", nullable: true })
  destruction: boolean | null;

  @Column("boolean", { name: "AdminConfirm" , nullable: true})
  adminConfirm: boolean | null;

  @ManyToOne(() => Users, (users) => users.storeTransactions)
  @JoinColumn([{ name: "AdminUserId", referencedColumnName: "id" }])
  adminUser: Users;

  @ManyToOne(() => Items, (items) => items.storeTransactions)
  @JoinColumn([{ name: "ItemId", referencedColumnName: "id" }])
  item: Items;

  @ManyToOne(
    () => StoreDispatchDetails,
    (storeDispatchDetails) => storeDispatchDetails.storeTransactions
  )
  @JoinColumn([{ name: "StoreDispatchDetailId", referencedColumnName: "id" }])
  storeDispatchDetail: StoreDispatchDetails;

  @ManyToOne(() => Stores, (stores) => stores.storeTransactions)
  @JoinColumn([{ name: "StoreId", referencedColumnName: "id" }])
  store: Stores;

  @ManyToOne(
    () => StoreReceiptDetails,
    (storeReceiptDetails) => storeReceiptDetails.storeTransactions
  )
  @JoinColumn([{ name: "StoreReceiptDetailId", referencedColumnName: "id" }])
  storeReceiptDetail: StoreReceiptDetails;

  @ManyToOne(() => Users, (users) => users.storeTransactions2)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
