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
import { Items } from "./Items";

@Index("TransmissionSummary_pkey", ["id"], { unique: true })
@Entity("TransmissionSummary", { schema: "public" })
export class TransmissionSummary {
    @Column("bigint", { primary: true, name: "Id", generated: "increment" })
    id: number;

    @Column("numeric", { name: "Weight", precision: 10, scale: 2 })
    weight: number;

    @Column("numeric", { name: "Length", precision: 10, scale: 2 })
    length: number;

    @Column("smallint", { name: "ProductStatus" })
    productStatus: transmissionProductStatus;

    @Column("numeric", { name: "DMMPercent", precision: 10, scale: 2 })
    dMMPercent: number;

    @Column("numeric", { name: "TotalWeight", precision: 10, scale: 2 })
    totalWeight: number;

    @Column("timestamp with time zone", { name: "CreateAt" })
    createAt: Date;

    @Column("smallint", { name: "RecordStatus" })
    recordStatus: number;




    @ManyToOne(() => Networks, (networks) => networks.transmissionSummary)
    @JoinColumn([{ name: "NetworkId", referencedColumnName: "id" }])
    network: Networks;

    @ManyToOne(() => Items, (items) => items.transmissionSummary)
    @JoinColumn([{ name: "ItemId", referencedColumnName: "id" }])
    item: Items;

    @ManyToOne(() => Users, (users) => users.transmissionRows)
    @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
    user: Users;
}
