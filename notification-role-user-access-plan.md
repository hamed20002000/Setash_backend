# طرح پیشنهادی دسترسی نوتیفیکیشن برای Role و User

## هدف
سیستم فعلی نوتیفیکیشن فقط بر اساس `Role` کار می‌کند. یعنی نوتیفیکیشن برای یک نقش مثل `admin` ساخته می‌شود و هر کلاینتی که با `query.role=admin` به Socket.IO وصل شود، آن را دریافت می‌کند.

هدف این تغییر این است که نوتیفیکیشن‌ها هم برای role قابل ارسال باشند، هم برای user مشخص، و وضعیت خوانده‌شدن برای هر کاربر درست و مستقل مدیریت شود.

## مشکل وضعیت فعلی
در وضعیت فعلی:

- اتصال socket فقط از `query.role` استفاده می‌کند.
- کلاینت می‌تواند role را خودش بفرستد، پس از نظر امنیتی قابل اعتماد نیست.
- جدول `SystemNotifications` فقط `Role` دارد و `UserId` ندارد.
- اگر یک notification برای role خوانده شود، مفهوم read/unread برای کاربرهای مختلف جدا نیست.
- خروجی API، id واقعی notification را برنمی‌گرداند و فقط `idValue` رکورد اصلی را برمی‌گرداند.

## راه‌حل پیشنهادی
مدل پیشنهادی این است:

- هر نوتیفیکیشن می‌تواند برای یک user مشخص باشد.
- هر نوتیفیکیشن می‌تواند role مقصد هم داشته باشد.
- برای نوتیفیکیشن‌های role-based، بهتر است برای هر user عضو آن role یک رکورد جدا ساخته شود.
- وضعیت read/unread باید per-user باشد، نه فقط per-role.

## تغییرات دیتابیس
به entity فعلی `SystemNotifications` این فیلدها اضافه شود:

```ts
@Column('uuid', { name: 'UserId', nullable: true })
userId: string | null;

@Column('boolean', { name: 'IsRead', default: false })
isRead: boolean;

@Column('timestamp with time zone', { name: 'ReadAt', nullable: true })
readAt: Date | null;
```

اگر نخواهیم فعلاً migration بزرگ بدهیم، می‌توانیم همچنان از `RecordStatus` استفاده کنیم:

- `Active`: خوانده‌نشده
- `Inactive`: خوانده‌شده

ولی از نظر خوانایی و توسعه آینده، `IsRead` و `ReadAt` بهتر هستند.

## مدل پیشنهادی رکورد
برای نوتیفیکیشن مستقیم به کاربر:

```ts
{
  role: null,
  userId: 'USER_UUID',
  type: 'request',
  idValue: '123',
  isRead: false
}
```

برای نوتیفیکیشن به همه adminها، به جای یک رکورد عمومی، برای هر admin یک رکورد ساخته شود:

```ts
{
  role: 'admin',
  userId: 'ADMIN_USER_UUID_1',
  type: 'order',
  idValue: '10',
  isRead: false
}
```

```ts
{
  role: 'admin',
  userId: 'ADMIN_USER_UUID_2',
  type: 'order',
  idValue: '10',
  isRead: false
}
```

مزیت این مدل این است که اگر یک admin نوتیفیکیشن را خواند، فقط برای خودش read می‌شود، نه برای همه adminها.

## تغییر اتصال Socket.IO
وضعیت فعلی:

```ts
query: { role: 'admin' }
```

پیشنهاد جدید:

کلاینت JWT را هنگام اتصال socket بفرستد:

```ts
io(API_URL, {
  path: '/socket.io',
  transports: ['websocket', 'polling'],
  auth: {
    token: accessToken,
  },
});
```

در Gateway، token decode/validate شود و از آن این اطلاعات گرفته شود:

- `userId`
- `roles`

بعد client وارد roomهای استاندارد شود:

```ts
client.join(`user:${userId}`);

for (const role of roles) {
  client.join(`role:${role}`);
}
```

با این روش، role از سمت کلاینت قابل جعل نیست و از JWT معتبر استخراج می‌شود.

## نام‌گذاری Roomها
برای جلوگیری از تداخل، roomها بهتر است prefix داشته باشند:

```ts
user:{userId}
role:{roleName}
```

مثال:

```ts
user:7f3b9f7e-...
role:admin
role:client
```

## متدهای پیشنهادی Gateway
به جای اینکه فقط `notifyRole` داشته باشیم، این متدها پیشنهاد می‌شود:

```ts
async notifyUser(userId: string, event: string, data: NotificationPayload)
```

برای ارسال مستقیم به یک کاربر.

```ts
async notifyRole(role: string, event: string, data: NotificationPayload)
```

برای ارسال به همه کاربران دارای یک role.

```ts
async notifyUsers(userIds: string[], event: string, data: NotificationPayload)
```

برای ارسال به چند کاربر مشخص.

## DTO یا Payload پیشنهادی
بهتر است payload ساختار مشخص داشته باشد:

```ts
export interface NotificationPayload {
  id: string | number;
  type: string;
  createdAt?: Date;
  warehouseId?: number | null;
  storeId?: number | null;
  projectId?: number | null;
  title?: string;
  message?: string;
}
```

## پیاده‌سازی notifyUser
نمونه منطق:

```ts
async notifyUser(userId: string, event: string, data: NotificationPayload) {
  const notification = new SystemNotifications();
  notification.userId = userId;
  notification.role = null;
  notification.type = data.type;
  notification.idValue = String(data.id);
  notification.recordStatus = recordStatus.Active;
  notification.isRead = false;
  notification.createAt = data.createdAt || new Date();
  notification.warehouseId = data.warehouseId || null;
  notification.storeId = data.storeId || null;
  notification.projectId = data.projectId || null;

  const saved = await this.systemNotificationsService.add(notification);

  this.server.to(`user:${userId}`).emit(event, {
    notificationId: saved.id,
    ...data,
  });
}
```

## پیاده‌سازی notifyRole
برای role بهتر است ابتدا userهای دارای آن role پیدا شوند و برای هرکدام یک notification جدا ساخته شود.

منطق پیشنهادی:

1. پیدا کردن users دارای role.
2. ساخت رکورد جدا برای هر user.
3. ارسال realtime به room role یا room userها.

نمونه ساده:

```ts
async notifyRole(role: string, event: string, data: NotificationPayload) {
  const users = await this.userRoleService.getUsersByRole(role);

  const notifications = users.map(user => {
    const notification = new SystemNotifications();
    notification.userId = user.id;
    notification.role = role;
    notification.type = data.type;
    notification.idValue = String(data.id);
    notification.recordStatus = recordStatus.Active;
    notification.isRead = false;
    notification.createAt = data.createdAt || new Date();
    notification.warehouseId = data.warehouseId || null;
    notification.storeId = data.storeId || null;
    notification.projectId = data.projectId || null;
    return notification;
  });

  await this.systemNotificationsService.addMany(notifications);

  this.server.to(`role:${role}`).emit(event, data);
}
```

نکته: اگر `addMany` در BaseService وجود ندارد، باید اضافه شود یا از repository استفاده شود.

## APIهای پیشنهادی
به جای endpointهای role-based فعلی، بهتر است endpointها user-based شوند و userId از JWT گرفته شود.

### گرفتن نوتیفیکیشن‌های کاربر جاری

```http
GET /notifications
```

منطق:

```ts
where: {
  userId: req.user.userid,
  isRead: false,
}
```

یا اگر `RecordStatus` نگه داشته شود:

```ts
where: {
  userId: req.user.userid,
  recordStatus: recordStatus.Active,
}
```

### خوانده‌شدن یک نوتیفیکیشن

```http
PUT /notifications/:notificationId/read
```

شرط مهم:

```ts
notification.userId === req.user.userid
```

یعنی کاربر فقط نوتیفیکیشن خودش را read کند.

### خوانده‌شدن همه نوتیفیکیشن‌ها

```http
PUT /notifications/read-all
```

منطق:

```ts
update all notifications where userId = req.user.userid and isRead = false
```

### خوانده‌شدن همه نوتیفیکیشن‌های یک type

```http
PUT /notifications/type/:type/read-all
```

برای سناریوهایی که کاربر همه order notificationها را باز کرده است.

## تغییر در خروجی API
خروجی فعلی:

```ts
{
  id: notification.idValue,
  createdAt: notification.createAt,
  type: notification.type,
}
```

خروجی پیشنهادی:

```ts
{
  notificationId: notification.id,
  id: notification.idValue,
  createdAt: notification.createAt,
  type: notification.type,
  warehouseId: notification.warehouseId,
  storeId: notification.storeId,
  projectId: notification.projectId,
  isRead: notification.isRead,
}
```

با این کار frontend می‌تواند read کردن را با `notificationId` واقعی انجام دهد.

## سطح دسترسی پیشنهادی
برای عملیات‌ها:

- گرفتن نوتیفیکیشن‌های خود کاربر: هر کاربر لاگین‌شده.
- read کردن نوتیفیکیشن خود کاربر: هر کاربر لاگین‌شده.
- ارسال notification مستقیم به user: فقط admin یا service داخلی.
- ارسال notification به role: فقط admin یا service داخلی.
- دیدن notificationهای همه کاربران: فقط admin، اگر واقعاً نیاز باشد.

## مسیر مهاجرت کم‌ریسک
برای اینکه سیستم فعلی نشکند، این مسیر مرحله‌ای بهتر است:

1. اضافه کردن `UserId`, `IsRead`, `ReadAt` به جدول و entity.
2. حفظ endpointهای فعلی برای سازگاری موقت.
3. اضافه کردن endpointهای جدید `/notifications`.
4. اضافه کردن roomهای `user:{id}` و `role:{role}` در Gateway.
5. تغییر `notifyRole` طوری که برای هر user عضو role رکورد جدا بسازد.
6. تغییر frontend برای استفاده از `notificationId` واقعی.
7. بعد از تست، endpointهای قدیمی role-based حذف یا deprecated شوند.

## تغییرات لازم در فایل‌ها
فایل‌هایی که احتمالاً باید تغییر کنند:

- `src/domain/entities/SystemNotifications.ts`
- migration جدید در `src/infrastructure/database/migrations`
- `src/application/services/notificatin/notifications.gateway.ts`
- `src/application/services/notificatin/systemNotifications.service.ts`
- `src/infrastructure/repositories/notification/system-notifications.repository.ts`
- `src/application/specifications/notification/system-notification-specifications.ts`
- `src/presentation/controllers/admin/baseinfo.controller.ts`
- احتمالاً `src/application/services/user/userRole.service.ts` یا repository مربوط به user role برای گرفتن users by role

## جمع‌بندی
راه‌حل پیشنهادی این است که نوتیفیکیشن‌ها از حالت فقط role خارج شوند و مالکیت user داشته باشند. Role همچنان برای هدف‌گیری گروهی استفاده می‌شود، اما رکورد دیتابیس برای هر user جدا ساخته می‌شود.

این مدل سه مزیت اصلی دارد:

- امنیت بهتر، چون role از JWT می‌آید نه query آزاد.
- read/unread درست برای هر کاربر.
- توسعه‌پذیری بهتر برای نوتیفیکیشن‌های مستقیم، گروهی و role-based.
