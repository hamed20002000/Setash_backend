import { Column, Entity, Index, OneToMany } from "typeorm";
import { CarFuels } from "./CarFuels";

import { Categories } from "./Categories";
import { ChannelRowItems } from "./ChannelRowItems";
import { ChannelRows } from "./ChannelRows";
import { ConsignedCars } from "./ConsignedCars";
import { Consignments } from "./Consignments";
import { CourseParticipants } from "./CourseParticipants";
import { Courses } from "./Courses";
import { DriverVehicles } from "./DriverVehicles";
import { Drivers } from "./Drivers";
import { ForceMajors } from "./ForceMajors";
import { InvoiceDetails } from "./InvoiceDetails";
import { InvoiceHeaderStatusHistories } from "./InvoiceHeaderStatusHistories";
import { InvoiceHeaders } from "./InvoiceHeaders";
import { ItemUnits } from "./ItemUnits";
import { Items } from "./Items";
import { LeaveHistories } from "./LeaveHistories";
import { Leaves } from "./Leaves";
import { Networks } from "./Networks";
import { OrderDetails } from "./OrderDetails";
import { OrderHeaderStatusHistories } from "./OrderHeaderStatusHistories";
import { OrderHeaders } from "./OrderHeaders";
import { PersonnelConsigneds } from "./PersonnelConsigneds";
import { PersonnelWorkPlaces } from "./PersonnelWorkPlaces";
import { Personnels } from "./Personnels";
import { Positions } from "./Positions";
import { ProductTypes } from "./ProductTypes";
import { ProjectFirms } from "./ProjectFirms";
import { ProjectPlanings } from "./ProjectPlanings";
import { ProjectPlanningImplementation } from "./ProjectPlanningImplementation";
import { Projects } from "./Projects";
import { Providers } from "./Providers";
import { ReceiptDetails } from "./ReceiptDetails";
import { ReceiptHeaders } from "./ReceiptHeaders";
import { Regions } from "./Regions";
import { RoleMenuOperations } from "./RoleMenuOperations";
import { Roles } from "./Roles";
import { Rollcalls } from "./Rollcalls";
import { StoreDispatchDetails } from "./StoreDispatchDetails";
import { StoreDispatchHeaderStatusHistories } from "./StoreDispatchHeaderStatusHistories";
import { StoreDispatchHeaders } from "./StoreDispatchHeaders";
import { StoreReceiptDetails } from "./StoreReceiptDetails";
import { StoreReceiptHeaders } from "./StoreReceiptHeaders";
import { StoreTransactions } from "./StoreTransactions";
import { Stores } from "./Stores";
import { SystemOperations } from "./SystemOperations";
import { Teachers } from "./Teachers";
import { TenderDetails } from "./TenderDetails";
import { TenderHeaders } from "./TenderHeaders";
import { TransmissionRowItmes } from "./TransmissionRowItmes";
import { TransmissionRows } from "./TransmissionRows";
import { UserRoles } from "./UserRoles";
import { WarehouseDispatchDetails } from "./WarehouseDispatchDetails";
import { WarehouseDispatchHeaders } from "./WarehouseDispatchHeaders";
import { WarehouseTransactions } from "./WarehouseTransactions";
import { Warehouses } from "./Warehouses";
import { WorkhouseDetails } from "./WorkhouseDetails";
import { Workhouses } from "./Workhouses";
import { Works } from "./Works";
import { Menus } from "./Menus";
import { UserMenuOperations } from "./UserMenuOperations";
import { WarehouseDispatchHeaderStatusHistories } from "./WarehouseDispatchHeaderStatusHistories";
import { Requests } from "./Requests";
import { RequestStatusHistories } from "./RequestStatusHistories";
import { WorkhouseRents } from "./WorkhouseRents";
import { workhouseRentStatus } from "../enums/workhouseRentStatus.enum";
import { WorkhouseRentStatusHistories } from "./WorkkhouseRentStatusHistories";
import { CarWarehouses } from "./CarWarehouses";
import { CarWarehouseDetails } from "./CarWarehouseDetails";
import { CommiteMembers } from "./CommiteMembers";
import { PersonnelSalary } from "./PersonnelSalary";
import { RoleNotificationLists } from "./RoleNotificationLists";
import { UserNotificationLists } from "./UserNotificationLists";

@Index("Users_pkey", ["id"], { unique: true })
@Entity("Users", { schema: "public" })
export class Users {
  @Column("uuid", { primary: true, name: "Id", generated: "uuid" })
  id: string;

  @Column("character varying", { name: "ImageSrc", nullable: true })
  imageSrc: string;

  @Column("character varying", { name: "Username", length: 150 })
  username: string;

  @Column("character varying", { name: "Password" })
  password: string;

  @Column("timestamp with time zone", { name: "CreateAt" })
  createAt: Date;

  @Column("smallint", { name: "RecordStatus" })
  recordStatus: number;

  @Column("uuid", { name: "UserId", nullable: true })
  userId: string;


  
  @OneToMany(() => CarFuels, (carFuels) => carFuels.user)
  carFuels: CarFuels[];

  @OneToMany(
    () => CarWarehouseDetails,
    (carWarehouseDetails) => carWarehouseDetails.user
  )
  carWarehouseDetails: CarWarehouseDetails[];

  @OneToMany(() => CarWarehouses, (carWarehouses) => carWarehouses.user)
  carWarehouses: CarWarehouses[];

  @OneToMany(() => Categories, (categories) => categories.user)
  categories: Categories[];

  @OneToMany(() => Menus, (menus) => menus.user)
  menus: Menus[];

  @OneToMany(() => ChannelRowItems, (channelRowItems) => channelRowItems.user)
  channelRowItems: ChannelRowItems[];

  @OneToMany(() => ChannelRows, (channelRows) => channelRows.user)
  channelRows: ChannelRows[];

  @OneToMany(() => ConsignedCars, (consignedCars) => consignedCars.user)
  consignedCars: ConsignedCars[];

  @OneToMany(() => Consignments, (consignments) => consignments.user)
  consignments: Consignments[];

  @OneToMany(
    () => CourseParticipants,
    (courseParticipants) => courseParticipants.user
  )
  courseParticipants: CourseParticipants[];

  @OneToMany(() => Courses, (courses) => courses.user)
  courses: Courses[];

  @OneToMany(() => DriverVehicles, (driverVehicles) => driverVehicles.user)
  driverVehicles: DriverVehicles[];

  @OneToMany(() => Drivers, (drivers) => drivers.user)
  drivers: Drivers[];

  @OneToMany(() => CommiteMembers, (commiteMembers) => commiteMembers.user)
  commiteMembers: CommiteMembers[];

  @OneToMany(() => Requests, (requests) => requests.user)
  requests: Requests[];

  @OneToMany(() => ForceMajors, (forceMajors) => forceMajors.user)
  forceMajors: ForceMajors[];

  @OneToMany(() => InvoiceDetails, (invoiceDetails) => invoiceDetails.user)
  invoiceDetails: InvoiceDetails[];

  @OneToMany(
    () => InvoiceHeaderStatusHistories,
    (invoiceHeaderStatusHistories) => invoiceHeaderStatusHistories.user
  )
  invoiceHeaderStatusHistories: InvoiceHeaderStatusHistories[];

  @OneToMany(() => InvoiceHeaders, (invoiceHeaders) => invoiceHeaders.user)
  invoiceHeaders: InvoiceHeaders[];

  @OneToMany(() => ItemUnits, (itemUnits) => itemUnits.user)
  itemUnits: ItemUnits[];

  @OneToMany(() => Items, (items) => items.user)
  items: Items[];

  @OneToMany(() => LeaveHistories, (leaveHistories) => leaveHistories.user)
  leaveHistories: LeaveHistories[];

  @OneToMany(() => Leaves, (leaves) => leaves.user)
  leaves: Leaves[];

  @OneToMany(() => Networks, (networks) => networks.user)
  networks: Networks[];

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.user)
  orderDetails: OrderDetails[];

  @OneToMany(
    () => OrderHeaderStatusHistories,
    (orderHeaderStatusHistories) => orderHeaderStatusHistories.user
  )
  orderHeaderStatusHistories: OrderHeaderStatusHistories[];

  
  @OneToMany(
    () => RequestStatusHistories,
    (requestStatusHistories) => requestStatusHistories.user
  )
  requestStatusHistories: RequestStatusHistories[];

  
  @OneToMany(
    () => WorkhouseRentStatusHistories,
    (workhouseRentStatusHistories) => workhouseRentStatusHistories.user
  )
  workhouseRentStatusHistories: WorkhouseRentStatusHistories[];

  @OneToMany(() => OrderHeaders, (orderHeaders) => orderHeaders.user)
  orderHeaders: OrderHeaders[];

  @OneToMany(
    () => PersonnelConsigneds,
    (personnelConsigneds) => personnelConsigneds.user
  )
  personnelConsigneds: PersonnelConsigneds[];

  @OneToMany(
    () => PersonnelWorkPlaces,
    (personnelWorkPlaces) => personnelWorkPlaces.user
  )
  personnelWorkPlaces: PersonnelWorkPlaces[];



  @OneToMany(() => Personnels, (personnels) => personnels.user)
  personnels: Personnels[];

    @OneToMany(() => PersonnelSalary, (personnelSalary) => personnelSalary.user)
  personnelSalaries: PersonnelSalary[];


  @OneToMany(() => Positions, (positions) => positions.user)
  positions: Positions[];

  @OneToMany(() => ProductTypes, (productTypes) => productTypes.user)
  productTypes: ProductTypes[];

  @OneToMany(() => ProjectFirms, (projectFirms) => projectFirms.user)
  projectFirms: ProjectFirms[];

  @OneToMany(() => ProjectPlanings, (projectPlanings) => projectPlanings.user)
  projectPlanings: ProjectPlanings[];

  @OneToMany(
    () => ProjectPlanningImplementation,
    (projectPlanningImplementation) => projectPlanningImplementation.user
  )
  projectPlanningImplementations: ProjectPlanningImplementation[];

  @OneToMany(() => Projects, (projects) => projects.user)
  projects: Projects[];

  @OneToMany(() => Providers, (providers) => providers.user)
  providers: Providers[];

  @OneToMany(() => ReceiptDetails, (receiptDetails) => receiptDetails.user)
  receiptDetails: ReceiptDetails[];

  @OneToMany(() => ReceiptHeaders, (receiptHeaders) => receiptHeaders.user)
  receiptHeaders: ReceiptHeaders[];

  @OneToMany(() => Regions, (regions) => regions.user)
  regions: Regions[];

  @OneToMany(
    () => RoleMenuOperations,
    (roleMenuOperations) => roleMenuOperations.role
  )
  roleMenuOperations: RoleMenuOperations[];

  @OneToMany(
    () => RoleNotificationLists,
    (roleNotificationLists) => roleNotificationLists.user
  )
  roleNotificationLists: RoleNotificationLists[];

  @OneToMany(() => Roles, (roles) => roles.user)
  roles: Roles[];

  @OneToMany(() => Rollcalls, (rollcalls) => rollcalls.user)
  rollcalls: Rollcalls[];

  @OneToMany(
    () => StoreDispatchDetails,
    (storeDispatchDetails) => storeDispatchDetails.user
  )
  storeDispatchDetails: StoreDispatchDetails[];

  @OneToMany(
    () => StoreDispatchHeaderStatusHistories,
    (storeDispatchHeaderStatusHistories) =>
      storeDispatchHeaderStatusHistories.user
  )
  storeDispatchHeaderStatusHistories: StoreDispatchHeaderStatusHistories[];

    @OneToMany(
    () => WarehouseDispatchHeaderStatusHistories,
    (warehouseDispatchHeaderStatusHistories) =>
      warehouseDispatchHeaderStatusHistories.user
  )
  warehouseDispatchHeaderStatusHistories: WarehouseDispatchHeaderStatusHistories[];

  @OneToMany(
    () => StoreDispatchHeaders,
    (storeDispatchHeaders) => storeDispatchHeaders.user
  )
  storeDispatchHeaders: StoreDispatchHeaders[];

  @OneToMany(
    () => StoreReceiptDetails,
    (storeReceiptDetails) => storeReceiptDetails.user
  )
  storeReceiptDetails: StoreReceiptDetails[];

  @OneToMany(
    () => StoreReceiptHeaders,
    (storeReceiptHeaders) => storeReceiptHeaders.user
  )
  storeReceiptHeaders: StoreReceiptHeaders[];

  @OneToMany(
    () => StoreTransactions,
    (storeTransactions) => storeTransactions.adminUser
  )
  storeTransactions: StoreTransactions[];

  @OneToMany(
    () => StoreTransactions,
    (storeTransactions) => storeTransactions.user
  )
  storeTransactions2: StoreTransactions[];

  @OneToMany(() => Stores, (stores) => stores.user)
  stores: Stores[];

  @OneToMany(
    () => SystemOperations,
    (systemOperations) => systemOperations.user
  )
  systemOperations: SystemOperations[];

  @OneToMany(() => Teachers, (teachers) => teachers.user)
  teachers: Teachers[];

  @OneToMany(() => TenderDetails, (tenderDetails) => tenderDetails.user)
  tenderDetails: TenderDetails[];

  @OneToMany(() => TenderHeaders, (tenderHeaders) => tenderHeaders.user)
  tenderHeaders: TenderHeaders[];

  @OneToMany(
    () => TransmissionRowItmes,
    (transmissionRowItmes) => transmissionRowItmes.user
  )
  transmissionRowItmes: TransmissionRowItmes[];

  @OneToMany(
    () => TransmissionRows,
    (transmissionRows) => transmissionRows.user
  )
  transmissionRows: TransmissionRows[];

  @OneToMany(() => UserRoles, (userRoles) => userRoles.assigendUser)
  userRoles: UserRoles[];

  @OneToMany(() => UserRoles, (userRoles) => userRoles.user)
  userRoles2: UserRoles[];

  @OneToMany(
    () => UserMenuOperations,
    (userMenuOperations) => userMenuOperations.mainUser
  )
  userMenuOperations: UserMenuOperations[];

  @OneToMany(
    () => UserMenuOperations,
    (userMenuOperations) => userMenuOperations.user
  )
  userMenuOperations2: UserMenuOperations[];

  @OneToMany(
    () => UserNotificationLists,
    (userNotificationLists) => userNotificationLists.assignedUser
  )
  assignedUserNotificationLists: UserNotificationLists[];

  @OneToMany(
    () => UserNotificationLists,
    (userNotificationLists) => userNotificationLists.user
  )
  userNotificationLists: UserNotificationLists[];

  @OneToMany(
    () => WarehouseDispatchDetails,
    (warehouseDispatchDetails) => warehouseDispatchDetails.user
  )
  warehouseDispatchDetails: WarehouseDispatchDetails[];

  @OneToMany(
    () => WarehouseDispatchHeaders,
    (warehouseDispatchHeaders) => warehouseDispatchHeaders.user
  )
  warehouseDispatchHeaders: WarehouseDispatchHeaders[];

  @OneToMany(
    () => WarehouseTransactions,
    (warehouseTransactions) => warehouseTransactions.adminUser
  )
  warehouseTransactions: WarehouseTransactions[];

  @OneToMany(
    () => WarehouseTransactions,
    (warehouseTransactions) => warehouseTransactions.user
  )
  warehouseTransactions2: WarehouseTransactions[];

  @OneToMany(() => Warehouses, (warehouses) => warehouses.user)
  warehouses: Warehouses[];

  @OneToMany(
    () => WorkhouseDetails,
    (workhouseDetails) => workhouseDetails.user
  )
  workhouseDetails: WorkhouseDetails[];

     @OneToMany(
      () => WorkhouseRents,
      (workhouseRents) => workhouseRents.workhouse
    )
    workhouseRents: WorkhouseRents[];

  @OneToMany(() => Workhouses, (workhouses) => workhouses.user)
  workhouses: Workhouses[];

  @OneToMany(() => Works, (works) => works.user)
  works: Works[];
}
