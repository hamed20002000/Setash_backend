import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { InvoiceHeaders } from "./InvoiceHeaders";
import { Users } from "./Users";
import { recordStatus } from "../enums/recordstatus.enum";
import { invoiceStatus } from "../enums/invoiceStatus.enum";

@Index("InvoiceHeaderStatusHistories_pkey", ["id"], { unique: true })
@Entity("InvoiceHeaderStatusHistories", { schema: "public" })
export class InvoiceHeaderStatusHistories {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: string;

  @Column("smallint", { name: "Status" })
  status: invoiceStatus;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: recordStatus;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @ManyToOne(
    () => InvoiceHeaders,
    (invoiceHeaders) => invoiceHeaders.invoiceHeaderStatusHistories
  )
  @JoinColumn([{ name: "InvoiceHeaderId", referencedColumnName: "id" }])
  invoiceHeader: InvoiceHeaders;

  @ManyToOne(() => Users, (users) => users.invoiceHeaderStatusHistories)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
