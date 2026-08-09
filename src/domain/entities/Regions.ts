import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from "typeorm";
import { Providers } from "./Providers";
import { Users } from "./Users";
import { Stores } from "./Stores";
import { Warehouses } from "./Warehouses";
import { Workhouses } from "./Workhouses";
import { CarWarehouses } from "./CarWarehouses";

@Index("Regions_pkey", ["id"], { unique: true })
@Tree("closure-table")
@Entity("Regions", { schema: "public" })
export class Regions {
  @PrimaryGeneratedColumn("increment", { type: "bigint", name: "id" })
  id: number;

  @Column("character varying", { name: "Name", length: 200 })
  name: string;
  @Column("smallint", { name: "Depth" })
  depth: number;
  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @OneToMany(() => CarWarehouses, (carWarehouses) => carWarehouses.region)
  carWarehouses: CarWarehouses[];

  @OneToMany(() => Providers, (providers) => providers.region)
  providers: Providers[];

  @TreeParent()
  @JoinColumn([{ name: "ParentId", referencedColumnName: "id" }])
  parent: Regions;

  @TreeChildren()
  regions: Regions[];

  @ManyToOne(() => Users, (users) => users.regions)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => Stores, (stores) => stores.region)
  stores: Stores[];

  @OneToMany(() => Warehouses, (warehouses) => warehouses.region)
  warehouses: Warehouses[];

  @OneToMany(() => Workhouses, (workhouses) => workhouses.region)
  workhouses: Workhouses[];
}
