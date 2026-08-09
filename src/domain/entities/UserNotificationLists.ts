import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { NotificationLists } from "./NotificationLists";
import { Users } from "./Users";

@Index("UserNotificationLists_pkey", ["id"], { unique: true })
@Index("UserNotificationLists_User_Notification_key", ["assignedUser", "notificationList"], { unique: true })
@Entity("UserNotificationLists", { schema: "public" })
export class UserNotificationLists {
  @Column("bigint", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @ManyToOne(() => Users, (users) => users.assignedUserNotificationLists)
  @JoinColumn([{ name: "AssignedUserId", referencedColumnName: "id" }])
  assignedUser: Users;

  @ManyToOne(
    () => NotificationLists,
    (notificationLists) => notificationLists.userNotificationLists
  )
  @JoinColumn([{ name: "NotificationListId", referencedColumnName: "id" }])
  notificationList: NotificationLists;

  @ManyToOne(() => Users, (users) => users.userNotificationLists)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
