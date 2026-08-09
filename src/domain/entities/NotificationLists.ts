import { Column, Entity, Index, OneToMany } from "typeorm";
import { RoleNotificationLists } from "./RoleNotificationLists";
import { UserNotificationLists } from "./UserNotificationLists";

@Index("NotificationLists_pkey", ["id"], { unique: true })
@Index("NotificationLists_Name_key", ["name"], { unique: true })
@Entity("NotificationLists", { schema: "public" })
export class NotificationLists {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("character varying", { name: "NameTr", nullable: true })
  nameTr: string;

  @OneToMany(
    () => RoleNotificationLists,
    (roleNotificationLists) => roleNotificationLists.notificationList
  )
  roleNotificationLists: RoleNotificationLists[];

  @OneToMany(
    () => UserNotificationLists,
    (userNotificationLists) => userNotificationLists.notificationList
  )
  userNotificationLists: UserNotificationLists[];
}
