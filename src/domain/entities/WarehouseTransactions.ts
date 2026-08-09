import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { Items } from "./Items";
import { Providers } from "./Providers";
import { ReceiptDetails } from "./ReceiptDetails";
import { WarehouseDispatchDetails } from "./WarehouseDispatchDetails";
import { Warehouses } from "./Warehouses";
import { WarehouseOperations } from "../enums/warehouse-op.enum";

@Index("WarehouseTransactions_pkey", ["id"], { unique: true })
@Entity("WarehouseTransactions", { schema: "public" })
export class WarehouseTransactions {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;
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

  @Column("boolean", { name: "Firm" , nullable: true })
  firm: boolean;

  @Column("boolean", { name: "Destruction", nullable: true })
  destruction: boolean | null;

  @Column("boolean", { name: "AdminConfirm", nullable: true })
  adminConfirm: boolean | null;

  @ManyToOne(() => Users, (users) => users.warehouseTransactions)
  @JoinColumn([{ name: "AdminUserId", referencedColumnName: "id" }])
  adminUser: Users;

  @ManyToOne(() => Items, (items) => items.warehouseTransactions)
  @JoinColumn([{ name: "ItemId", referencedColumnName: "id" }])
  item: Items;

  @ManyToOne(() => Providers, (providers) => providers.warehouseTransactions)
  @JoinColumn([{ name: "ProviderId", referencedColumnName: "id" }])
  provider: Providers;

  @ManyToOne(
    () => ReceiptDetails,
    (receiptDetails) => receiptDetails.warehouseTransactions
  )
  @JoinColumn([{ name: "ReceiptDetailId", referencedColumnName: "id" }])
  receiptDetail: ReceiptDetails;

  @ManyToOne(() => Users, (users) => users.warehouseTransactions2)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(
    () => WarehouseDispatchDetails,
    (warehouseDispatchDetails) => warehouseDispatchDetails.warehouseTransactions
  )
  @JoinColumn([
    { name: "WarehouseDispatchDetailId", referencedColumnName: "id" },
  ])
  warehouseDispatchDetail: WarehouseDispatchDetails;

  @ManyToOne(() => Warehouses, (warehouses) => warehouses.warehouseTransactions)
  @JoinColumn([{ name: "WarehouseId", referencedColumnName: "id" }])
  warehouse: Warehouses;
}
