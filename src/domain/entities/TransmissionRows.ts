import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { TransmissionRowItmes } from "./TransmissionRowItmes";
import { ChannelRows } from "./ChannelRows";
import { Networks } from "./Networks";
import { Users } from "./Users";
import { transmissionProductStatus } from "../enums/channelrow-product-status.enum";
import { ProjectPlanningImplementation } from "./ProjectPlanningImplementation";

@Index("TransmissionRows_pkey", ["id"], { unique: true })
@Entity("TransmissionRows", { schema: "public" })
export class TransmissionRows {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("integer", { name: "Distance" })
  distance: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("smallint", { name: "ProductStatus" })
  productStatus: transmissionProductStatus;

  @Column("character varying", { name: "FormulaTitle" })
  formulaTitle: string;

  @OneToMany(
    () => TransmissionRowItmes,
    (transmissionRowItmes) => transmissionRowItmes.transmissionRow
  )
  transmissionRowItmes: TransmissionRowItmes[];

  @ManyToOne(() => ChannelRows, (channelRows) => channelRows.transmissionRows)
  @JoinColumn([{ name: "FromProductTypeId", referencedColumnName: "id" }])
  fromProductType: ChannelRows;

  @ManyToOne(() => Networks, (networks) => networks.transmissionRows)
  @JoinColumn([{ name: "NetworkId", referencedColumnName: "id" }])
  network: Networks;

  @ManyToOne(() => ChannelRows, (channelRows) => channelRows.transmissionRows2)
  @JoinColumn([{ name: "ToProductTypeId", referencedColumnName: "id" }])
  toProductType: ChannelRows;

  @ManyToOne(() => Users, (users) => users.transmissionRows)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;


    @OneToMany(
        () => ProjectPlanningImplementation,
        (projectPlanningImplementation) => projectPlanningImplementation.transmissionRow
      )
      projectPlanningImplementations: ProjectPlanningImplementation[];
}
