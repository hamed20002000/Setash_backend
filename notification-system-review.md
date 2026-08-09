# بررسی سیستم نوتیفیکیشن

## خلاصه
سیستم نوتیفیکیشن پروژه با Socket.IO و NestJS WebSocketGateway پیاده‌سازی شده و همزمان دو خروجی دارد:

1. ارسال realtime به کلاینت‌هایی که عضو room نقش موردنظر هستند.
2. ذخیره رکورد نوتیفیکیشن در جدول `SystemNotifications` برای نمایش نوتیفیکیشن‌های خوانده‌نشده.

مسیر اصلی کد:

- `src/application/services/notificatin/notifications.gateway.ts`
- `src/application/services/notificatin/systemNotifications.service.ts`
- `src/application/services/notificatin/notifications.module.ts`
- `src/domain/entities/SystemNotifications.ts`
- `src/infrastructure/repositories/notification/system-notifications.repository.ts`
- `src/presentation/controllers/admin/baseinfo.controller.ts`

نکته: نام فولدر به صورت `notificatin` نوشته شده، نه `notification`.

## ثبت ماژول
`NotificationsModule` در `src/app.module.ts` import شده است. خود ماژول این providerها را export می‌کند:

- `NotificationsGateway`
- `SystemNotificationsService`
- `SystemNotificationsRepository`

به همین دلیل ماژول‌های دیگر مثل admin، warehouse و hr می‌توانند Gateway یا سرویس نوتیفیکیشن را inject کنند.

## اتصال Socket.IO
Gateway در `notifications.gateway.ts` با این تنظیمات تعریف شده است:

```ts
@WebSocketGateway({
  cors: { origin: ['http://localhost:5173'], credentials: false },
  path: '/socket.io',
  transports: ['websocket', 'polling'],
})
```

یعنی کلاینت باید به Socket.IO با path پیش‌فرض `/socket.io` وصل شود و در حال حاضر فقط origin `http://localhost:5173` مجاز است.

هنگام اتصال، Gateway از query string مقدار `role` را می‌خواند:

```ts
let roles = client.handshake.query.role;
```

اگر role وجود داشته باشد، کاربر وارد roomهای همان نقش‌ها می‌شود:

```ts
client.join(r);
```

پس سمت کلاینت باید چیزی شبیه این ارسال کند:

```ts
io(API_URL, {
  path: '/socket.io',
  transports: ['websocket', 'polling'],
  query: { role: 'admin' },
});
```

اگر کاربر چند نقش داشته باشد، Gateway آرایه role را هم پشتیبانی می‌کند.

## ارسال نوتیفیکیشن
متد اصلی ارسال این است:

```ts
notifyRole(roles: string | string[], event: string, data: any)
```

الگوی رایج فراخوانی در پروژه:

```ts
this.gateway.notifyRole(['admin'], 'new-notify', {
  id: entity.id,
  createdAt: entity.createAt,
  type: 'order',
});
```

این متد برای هر role این کارها را انجام می‌دهد:

1. ساخت entity از `SystemNotifications`.
2. پر کردن `role`, `type`, `idValue`, `recordStatus`, `createAt`, `warehouseId`, `storeId`, `projectId`.
3. ذخیره در دیتابیس با `systemNotificationsService.add(notification)`.
4. ارسال realtime به room همان role:

```ts
this.server.to(role).emit(event, data);
```

Event فعلی تقریباً همه‌جا `new-notify` است.

## ساختار دیتابیس
Entity مربوط به جدول `SystemNotifications` این فیلدها را دارد:

- `Id`: کلید اصلی auto increment
- `Role`: نقش دریافت‌کننده، مثل `admin`
- `Type`: نوع نوتیفیکیشن، مثل `order` یا `invoice-to-store`
- `IdValue`: شناسه رکورد اصلی، از `data.id`
- `WarehouseId`: اختیاری
- `StoreId`: اختیاری
- `ProjectId`: اختیاری
- `RecordStatus`: وضعیت رکورد
- `CreateAt`: زمان ایجاد

Enum وضعیت رکورد:

```ts
export enum recordStatus {
  Active,
  Inactive,
  Archive
}
```

در این سیستم، `Active` یعنی نوتیفیکیشن خوانده‌نشده/فعال و `Inactive` یعنی خوانده‌شده.

## خواندن نوتیفیکیشن‌ها
Endpointهای نوتیفیکیشن داخل `baseinfo.controller.ts` هستند.

### گرفتن نوتیفیکیشن‌های فعال یک نقش

```http
GET /get-system-notification/:role
```

Guard:

- `JwtAuthGuard`
- `AdminAndClientRolesGuard`

این endpoint فقط رکوردهای `Active` همان role را برمی‌گرداند. خروجی map شده شامل این فیلدهاست:

```ts
{
  id: notification.idValue,
  createdAt: notification.createAt,
  type: notification.type,
  warehouseId: notification.warehouseId,
  storeId: notification.storeId,
  projectId: notification.projectId
}
```

نکته: `id` در خروجی، id خود نوتیفیکیشن نیست؛ مقدار `IdValue` است، یعنی id رکورد اصلی که نوتیفیکیشن برای آن ساخته شده.

### خوانده‌شدن یک نوتیفیکیشن

```http
PUT /set-system-notification-read/:id/:type/:role
```

Guard:

- `JwtAuthGuard`
- `AdminRolesGuard`

این endpoint با ترکیب `role + type + idValue` نوتیفیکیشن فعال را پیدا می‌کند و `recordStatus` آن را `Inactive` می‌کند.

### خوانده‌شدن همه نوتیفیکیشن‌های یک type برای یک role

```http
PUT /set-system-notification-read/:type/:role
```

Guard:

- `JwtAuthGuard`
- `AdminRolesGuard`

همه نوتیفیکیشن‌های فعال با آن `role` و `type` را `Inactive` می‌کند.

## محل‌های تولید نوتیفیکیشن
در حال حاضر نوتیفیکیشن‌ها تقریباً همیشه برای role `admin` ساخته می‌شوند و event همه آن‌ها `new-notify` است.

نمونه typeهای استفاده‌شده:

- `order`
- `tender`
- `invoice-to-warehouse`
- `invoice-to-store`
- `warehouse-dispatch`
- `warehouse-dispatch-destruction`
- `warehouse-dispatch-between-warehouse`
- `store-dispatch-to-project`
- `store-dispatch-destruction-to-center`
- `store-dispatch-to-center`
- `store-dispatch-between-store`
- `personnel-created`
- `leave-created`
- `request`

فایل‌هایی که `notifyRole` را صدا می‌زنند:

- `src/infrastructure/repositories/admin/order.repository.ts`
- `src/infrastructure/repositories/sale/invoice.repository.ts`
- `src/infrastructure/repositories/store/store-dispatch.repository.ts`
- `src/infrastructure/repositories/warehouse/warehouse-dispatch.repository.ts`
- `src/presentation/controllers/admin/initial-operation.controller.ts`
- `src/presentation/controllers/hr/hr.controller.ts`
- `src/presentation/controllers/warehouse/warehouse.controller.ts`

## جریان کامل کار
1. کاربر یا سیستم یک عملیات انجام می‌دهد، مثل ایجاد order یا invoice.
2. بعد از ذخیره رکورد اصلی، کد `this.gateway.notifyRole(...)` را صدا می‌زند.
3. Gateway یک رکورد `SystemNotifications` با `recordStatus.Active` می‌سازد.
4. Gateway همان payload را روی event `new-notify` به room نقش، معمولاً `admin`، emit می‌کند.
5. کلاینت‌هایی که با `query.role=admin` وصل شده‌اند، event را realtime دریافت می‌کنند.
6. برای بارگذاری/refresh، کلاینت می‌تواند `GET /get-system-notification/admin` را بزند.
7. بعد از نمایش یا کلیک، کلاینت endpoint خوانده‌شدن را صدا می‌زند تا status به `Inactive` تغییر کند.

## نکات و ریسک‌ها
- ذخیره دیتابیس در `notifyRole` با `await` انجام نشده است. اگر ذخیره fail شود، خطا مدیریت نمی‌شود و ممکن است socket event ارسال شود ولی رکورد دیتابیس ساخته نشود.
- Gateway هیچ احراز هویتی روی اتصال socket ندارد و فقط به `query.role` اعتماد می‌کند. هر کلاینتی که بتواند وصل شود، می‌تواند خودش را `admin` معرفی کند.
- CORS فعلاً فقط `http://localhost:5173` را اجازه می‌دهد. برای محیط production باید تنظیمات origin اصلاح شود.
- خروجی `GET /get-system-notification/:role` id واقعی نوتیفیکیشن را برنمی‌گرداند؛ فقط `idValue` را برمی‌گرداند. به همین دلیل خوانده‌شدن بر اساس `idValue + type + role` انجام می‌شود.
- اگر برای یک `type` و `idValue` چند نوتیفیکیشن active وجود داشته باشد، endpoint تکی فقط اولین مورد را inactive می‌کند.
- بیشتر فراخوانی‌ها فقط برای `admin` هستند؛ اگر قرار است نوتیفیکیشن برای نقش‌های دیگر هم باشد، باید role درست در payload و اتصال کلاینت هماهنگ شود.

## پیشنهادهای بهبود
- `notifyRole` بهتر است async شود و ذخیره دیتابیس با `await` و try/catch انجام شود.
- اتصال Socket.IO بهتر است با JWT اعتبارسنجی شود و role از token استخراج شود، نه از query آزاد.
- بهتر است `notification.id` واقعی هم در خروجی API برگردد تا mark-as-read دقیق‌تر شود.
- typeهای نوتیفیکیشن بهتر است به enum یا constant مشترک منتقل شوند تا typo کمتر شود.
- برای production، originهای مجاز Gateway باید از config/env خوانده شوند.
