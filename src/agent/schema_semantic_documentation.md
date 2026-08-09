# Semantic Documentation Layer — PostgreSQL Schema
### Purpose: Knowledge base for an AI Agent that generates SQL from natural-language requests

> ⚠️ **Note on input completeness**: The schema text supplied to me is cut off mid-definition at the `public."Providers"` table (it ends at `"RecordStatus" int2 NOT...`). Everything up to and including `ForceMajors`... `Networks`, `Personnels`, and the *start* of `Providers` is documented faithfully below. The `Providers` table is included with only the columns that were visible, and is explicitly flagged as **INCOMPLETE**. No column or table beyond what was supplied has been invented.

---

## 1. Database Overview

**Domain**: This database supports a **facility/project inspection, logistics, and workforce-management back-office system**, most likely for a public-sector or utility organization operating in Turkey (evidenced by bilingual fields such as `Name` / `NameTr`, `TrAdi`, and Turkish-specific business terms such as `GeciciTutanakTeslimAlmaDurumu` — "temporary minutes/report delivery-receipt status" — and `KesinTutanakTeslimAlmaDurumu` — "final minutes/report delivery-receipt status").

The system appears to combine four functional areas:

1. **Identity, access control & navigation** — `Users`, `Roles`, `UserRoles`, `Menus` (+closure table), `SystemOperations`, `MenuOperations`, `UserSystemOperations`, `NotificationLists`, `UserNotificationLists`, `SystemNotifications`. This is a classic RBAC (role-based access control) + dynamic-menu backend for an admin panel.
2. **Project / facility confirmation & inspection workflow** — `TenderHeaders`, `Works`, `Networks`, `ProjectFirms`, `ConfirmationProjectReport`, `CommiteMembers`, `ConfirmationReportCommiteMember`, `ConfirmationReportCommiteMemberAnswer`, `ForceMajors`. This models tenders awarded for construction/installation "works" (likely network/infrastructure installation projects), which are later inspected/confirmed by committees who record members and their answers/decisions on formal reports ("tutanak" = official minutes/protocol in Turkish).
3. **Warehouse, inventory & logistics/dispatch operations** — `Warehouses`, `CarWarehouses`, `Items`, `ItemUnits`, `Categories` (+closure table), `ProductTypes`, `Consignments`, `ConsignmentNos`, `InvoiceNos`, `ReceiptNos`, `StoreDispatchNos`, `StoreReceiptNos`, `WarehouseDispatchNos`, `Drivers`, `DriverVehicles`, `Regions` (+closure table). This models stock items organized into hierarchical categories, held in fixed and mobile ("Car") warehouses located in regions, moved via consignments transported by drivers/vehicles, and tracked using auto-issued sequential document numbers (invoice, receipt, dispatch numbers).
4. **Human resources** — `Personnels`, `Positions`, `Teachers`, `Providers` (external providers/suppliers, definition incomplete).

**Application type**: A multi-module ERP/back-office web application (the presence of TypeORM-style migration hashes in constraint names, e.g. `FK_ab115fdcbd15aa0c6aa6846fe7f`, and a `migrations` table strongly indicates a **Node.js/TypeORM-backed relational application**, likely with an Angular/React admin panel driven by the `Menus`/`SystemOperations`/`MenuOperations` permission tables).

---

## 2. Cross-Cutting Conventions (apply to almost every table)

These patterns recur across nearly all business tables and should be treated as **schema-wide defaults** by the SQL-generation agent:

| Column | Type | Meaning | Notes for SQL generation |
|---|---|---|---|
| `Id` / `id` | `bigserial` (int8) OR `uuid` (only `Users.Id`) | Primary key / surrogate identifier | Always the PK unless stated otherwise. Case-sensitive: quote as `"Id"` in generated SQL because Postgres identifiers here are mixed-case and must be double-quoted. |
| `CreateAt` | `timestamptz` | Record creation timestamp (audit column) | Use for "created on/after/before/between" and "recent" queries; use for `ORDER BY ... DESC` when the user asks for "latest"/"newest" records. |
| `RecordStatus` | `int2` (smallint) | Generic status/soft-delete flag used almost universally | **Assumption**: exact enum values are not defined in the schema (no CHECK constraint or comment). The most common convention for this pattern is `1 = Active`, `0`/`2` = `Inactive/Deleted`. The agent should **not hard-code numeric literals** for "active" unless the user specifies them, and should ask/flag ambiguity, or filter using the highest observed value if the user says "active" without further context. Because this is unverified, treat it as best-effort filtering logic, not a guaranteed fact. |
| `UserId` | `uuid`, nullable, FK → `Users.Id` | The **audit/owner column**: identifies which application user created/owns the record (NOT the business "assigned to" user in most tables). | Use only when the user's request is about "who created/entered this record", not for business assignment semantics (see `UserNotificationLists`, `UserRoles`, `UserSystemOperations`, `ConfirmationReportCommiteMember` where a *different* explicit "assigned" column exists). |
| `Name` / `Title` | `varchar` | Human-readable label for the entity | Primary text-search/filter column (`ILIKE '%...%'`) for lookups by name. |

**Self-referencing hierarchy + closure-table pattern**: `Categories`/`Categories_closure`, `Menus`/`Menus_closure`, `Regions`/`Regions_closure` all implement the same **adjacency-list + closure-table** hierarchy design:
- The base table has a `ParentId` (self-FK) and a `Depth` column (nesting level, 0 = root).
- The `_closure` table stores **every ancestor→descendant pair** (including self-pairs where ancestor = descendant), which lets the agent answer "all descendants of X" or "all ancestors of X" with a simple join instead of a recursive CTE:
  - All descendants of node `N`: `SELECT id_descendant FROM "<Table>_closure" WHERE id_ancestor = N`
  - All ancestors of node `N`: `SELECT id_ancestor FROM "<Table>_closure" WHERE id_descendant = N`
  - Direct children only: filter the base table by `"ParentId" = N`.

---

## 3. Table-by-Table Documentation

### 3.1 Identity, Access Control & Navigation

#### `Users`
Business meaning: application user accounts (login credentials for staff using the back-office system).
| Column | Type | Meaning | Required? | Notes |
|---|---|---|---|---|
| `Id` | uuid (PK) | Unique user identifier | Yes | Default `uuid_generate_v4()` |
| `Username` | varchar(150) | Login name | Yes | Likely unique in practice, though no unique index is defined in the DDL — do not assume uniqueness is enforced at the DB level. |
| `Password` | varchar | Hashed password | Yes | Never select/expose in generated SQL results. |
| `CreateAt` | timestamptz | Account creation date | Yes | |
| `RecordStatus` | int2 | Active/inactive flag | Yes | See §2 |
| `UserId` | uuid, nullable | **Assumption**: self-referencing "created by" (which admin created this user account); no FK constraint is defined, so this cannot be joined reliably. | No | Treat as informational only; do not join to `Users.Id` for this column since there's no declared FK. |
| `ImageSrc` | varchar, nullable | Path/URL to profile picture | No | |

Relationships: `Users` is the central audit/ownership table — nearly every other table has a nullable `UserId` FK pointing here (one-to-many: one user → many owned records).

#### `Roles`
Business meaning: named permission roles (e.g., Admin, Warehouse Clerk, Committee Member) assignable to users.
| Column | Type | Meaning | Required |
|---|---|---|---|
| `Id` | bigserial (PK) | Role identifier | Yes |
| `Name` | varchar | Role name | Yes |
| `CreateAt` | timestamptz | Creation date | Yes |
| `RecordStatus` | int2 | Active/inactive | Yes |
| `UserId` | uuid, FK → Users | Creator/owner | No |

Insert Rules:
- Id is BIGSERIAL and is generated automatically by PostgreSQL.
- Never provide Id in INSERT statements.
- CreateAt is generated by the database if a default exists; otherwise provide CURRENT_TIMESTAMP.
- RecordStatus must be 1 when creating a new role unless the user specifies otherwise.
- UserId should only be set if the user explicitly provides it.

Example INSERT:

INSERT INTO "Roles"
("Name","RecordStatus")
VALUES ('Admin',1);


#### `UserRoles`
Business meaning: many-to-many **assignment** table linking users to roles.
| Column | Type | Meaning | Required |
|---|---|---|---|
| `Id` | bigserial (PK) | Row id | Yes |
| `RecordStatus` | int2 | Active/inactive assignment | Yes |
| `AssigendUserId` | uuid, FK → Users | **The user who receives the role** (business subject of the assignment) — note the original typo "Assigend" is part of the actual column name and must be reproduced exactly in SQL. | No |
| `RoleId` | bigint, FK → Roles | The role being granted | No |
| `UserId` | uuid, FK → Users | Audit column: who performed the assignment | No |
| `CreateAt` | timestamptz | Assignment date | Yes |

Relationship: `Users` (1) —— (∞) `UserRoles` (∞) —— (1) `Roles`. To find "what roles does user X have": join `UserRoles.AssigendUserId = Users.Id` and `UserRoles.RoleId = Roles.Id`.
