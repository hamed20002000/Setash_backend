import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Tree,
  TreeParent,
} from "typeorm";
import { ChannelRowItems } from "./ChannelRowItems";
import { Networks } from "./Networks";
import { ProductTypes } from "./ProductTypes";
import { Projects } from "./Projects";
import { Users } from "./Users";
import { Works } from "./Works";
import { TransmissionRows } from "./TransmissionRows";
import { productStatus } from "../enums/channelrow-product-status.enum";
import { NetworkTrAdis } from "./NetworkTrAdis";
import { ProjectPlanningImplementation } from "./ProjectPlanningImplementation";

@Index("ChannelRows_pkey", ["id"], { unique: true })
@Tree("closure-table")
@Entity("ChannelRows", { schema: "public" })
export class ChannelRows {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("smallint", { name: "ProductStatus" })
  productStatus: productStatus;

  @Column("character varying", { name: "Title" })
  title: string;

  @Column("character varying", { name: "Label" })
  label: string;

  @OneToMany(
    () => ChannelRowItems,
    (channelRowItems) => channelRowItems.channelRow
  )
  channelRowItems: ChannelRowItems[];

  @ManyToOne(() => NetworkTrAdis, (NetworkTrAdis) => NetworkTrAdis.channelRows)
  @JoinColumn([{ name: "NetworkTrAdisId", referencedColumnName: "id" }])
  networkTrAdi: NetworkTrAdis;



  @TreeParent()
  @JoinColumn([{ name: "ParentId", referencedColumnName: "id" }])
  parent: ChannelRows;

  @OneToMany(() => ChannelRows, (channelRows) => channelRows.parent)
  channelRows: ChannelRows[];

  @ManyToOne(() => ProductTypes, (productTypes) => productTypes.channelRows)
  @JoinColumn([{ name: "ProductTypeId", referencedColumnName: "id" }])
  productType: ProductTypes;

  @ManyToOne(() => Projects, (projects) => projects.channelRows)
  @JoinColumn([{ name: "ProjectId", referencedColumnName: "id" }])
  project: Projects;

  @ManyToOne(() => Users, (users) => users.channelRows)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Works, (works) => works.channelRows)
  @JoinColumn([{ name: "WorkhouseId", referencedColumnName: "id" }])
  workhouse: Works;

  @OneToMany(
    () => TransmissionRows,
    (transmissionRows) => transmissionRows.fromProductType
  )
  transmissionRows: TransmissionRows[];

  @OneToMany(
    () => TransmissionRows,
    (transmissionRows) => transmissionRows.toProductType
  )
  transmissionRows2: TransmissionRows[];

  @OneToMany(
      () => ProjectPlanningImplementation,
      (projectPlanningImplementation) => projectPlanningImplementation.channelRow
    )
    projectPlanningImplementations: ProjectPlanningImplementation[];
}
