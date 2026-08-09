import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { NotificationLists } from "./NotificationLists";
import { Roles } from "./Roles";
import { Users } from "./Users";

@Index("RoleNotificationLists_pkey", ["id"], { unique: true })
@Index("RoleNotificationLists_Role_Notification_key", ["role", "notificationList"], { unique: true })
@Entity("RoleNotificationLists", { schema: "public" })
export class RoleNotificationLists {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @ManyToOne(() => Roles, (roles) => roles.roleNotificationLists)
  @JoinColumn([{ name: "RoleId", referencedColumnName: "id" }])
  role: Roles;

  @ManyToOne(
    () => NotificationLists,
    (notificationLists) => notificationLists.roleNotificationLists
  )
  @JoinColumn([{ name: "NotificationListId", referencedColumnName: "id" }])
  notificationList: NotificationLists;

  @ManyToOne(() => Users, (users) => users.roleNotificationLists)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
