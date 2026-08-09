import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { PersonnelWorkPlaces } from "./PersonnelWorkPlaces";
import { Personnels } from "./Personnels";
import { Users } from "./Users";

@Index("Positions_pkey", ["id"], { unique: true })
@Entity("Positions", { schema: "public" })
export class Positions {
  @Column("bigint", { primary: true, name: "Id" ,generated:"increment"})
  id: number;

  @Column("character varying", { name: "Title" })
  title: string;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @OneToMany(
    () => PersonnelWorkPlaces,
    (personnelWorkPlaces) => personnelWorkPlaces.position
  )
  personnelWorkPlaces: PersonnelWorkPlaces[];

  @OneToMany(() => Personnels, (personnels) => personnels.position)
  personnels: Personnels[];

  @ManyToOne(() => Users, (users) => users.positions)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
