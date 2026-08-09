import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Items } from "./Items";
import { TenderHeaders } from "./TenderHeaders";
import { Users } from "./Users";
import { TenderCategories } from "./TenderCategories";

@Index("TenderDetails_pkey", ["id"], { unique: true })
@Entity("TenderDetails", { schema: "public" })
export class TenderDetails {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;
  @Column("numeric", { name: "FirmProcuredItemQuantities", precision: 10, scale: 2 })
  firmProcuredItemQuantities: number;

  @Column("character varying", { name: "EskiPoz", nullable: true })
  eskiPoz: string;
  @Column("character varying", { name: "Tedas", nullable: true })
  tedas: string;
  @Column("character varying", { name: "Ana", nullable: true})
  ana: string;
  @Column("character varying", { name: "Alt", nullable: true })
  alt: string;


  @Column("numeric", { name: "OurProcuredItemQuantities", precision: 10, scale: 2 })
  ourProcuredItemQuantities: number;
  @Column("numeric", { name: "Demontaj", precision: 10, scale: 2 })

  demontaj: number;
  @Column("numeric", { name: "DemontajMontaj", precision: 10, scale: 2 })

  demontajMontaj: number;

  @Column("money", { name: "FirmProcuredItemPrice" })
  firmProcuredItemPrice: string;

  @Column("money", { name: "OurProcuredItemPrice", nullable: true })
  ourProcuredItemPrice: string | null;

  @Column("money", { name: "MontajPrice" })
  montajPrice: string;

  @Column("money", { name: "DemontajPrice" })
  demontajPrice: string;

  @Column("money", { name: "DemontajMontajPrice" })
  demontajMontajPrice: string;
  


  @Column("money", { name: "MalzemeTutari" })
  malzemeTutari: string;

  @Column("money", { name: "MontajTutari" })
  montajTutari: string;

  @Column("money", { name: "DemontajTutari" })
  demontajTutari: string;

  @Column("money", { name: "DMMTutari" })
  dMMTutari: string;



  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @ManyToOne(() => Items, (items) => items.tenderDetails)
  @JoinColumn([{ name: "ItemId", referencedColumnName: "id" }])
  item: Items;

  @ManyToOne(
    () => TenderCategories,
    (tenderCategories) => tenderCategories.tenderDetails, {
    onDelete: 'CASCADE',
  }
  )
  @JoinColumn([{ name: "TenderCategoryId", referencedColumnName: "id" }])
  tenderCategory: TenderCategories;

  @ManyToOne(() => Users, (users) => users.tenderDetails)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
