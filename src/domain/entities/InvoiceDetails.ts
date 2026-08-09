import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { InvoiceHeaders } from "./InvoiceHeaders";
import { Items } from "./Items";
import { OrderDetails } from "./OrderDetails";
import { Users } from "./Users";
import { ReceiptDetails } from "./ReceiptDetails";
import { recordStatus } from "../enums/recordstatus.enum";
import { Providers } from "./Providers";
import { StoreReceiptDetails } from "./StoreReceiptDetails";

@Index("InvoiceDetails_pkey", ["id"], { unique: true })
@Entity("InvoiceDetails", { schema: "public" })
export class InvoiceDetails {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("numeric", { name: "quantity", precision: 10, scale: 2, nullable: true })
  quantity: number | null;

  @Column("money", { name: "Price" })
  price: number;

  @Column("money", { name: "TotalPrice" })
  totalPrice: number;
  @Column("numeric", { name: "DiscountPercent", precision: 10, scale: 2 })

  discountPercent: number;

  @Column("money", { name: "DiscountAmount" })
  discountAmount: number;

  @Column("money", { name: "TotalDiscount" })
  totalDiscount: number;

  @Column("money", { name: "TotalNetPrice" })
  totalNetPrice: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: recordStatus;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @Column("boolean", { name: "Firm", nullable: true })
  firm: boolean | null;
  @ManyToOne(() => Providers, (providers) => providers.invoiceDetails)
  @JoinColumn([{ name: "ProviderId", referencedColumnName: "id" }])
  provider: Providers;

  @ManyToOne(
    () => InvoiceHeaders,
    (invoiceHeaders) => invoiceHeaders.invoiceDetails
  )
  @JoinColumn([{ name: "InvoiceHeaderId", referencedColumnName: "id" }])
  invoiceHeader: InvoiceHeaders;

  @ManyToOne(() => Items, (items) => items.invoiceDetails)
  @JoinColumn([{ name: "ItemId", referencedColumnName: "id" }])
  item: Items;

  @ManyToOne(() => OrderDetails, (orderDetails) => orderDetails.invoiceDetails)
  @JoinColumn([{ name: "OrderDetailId", referencedColumnName: "id" }])
  orderDetail: OrderDetails;

  @ManyToOne(() => Users, (users) => users.invoiceDetails)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(
    () => ReceiptDetails,
    (receiptDetails) => receiptDetails.invoiceDetail
  )
  receiptDetails: ReceiptDetails[];

  @OneToMany(
    () => StoreReceiptDetails,
    (receiptDetails) => receiptDetails.invoiceDetail
  )
  storeReceiptDetails: StoreReceiptDetails[];
}
