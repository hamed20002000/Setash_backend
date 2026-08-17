import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { WorkhouseRepository } from 'src/infrastructure/repositories/admin/workhouse.repository';
import { Providers } from 'src/domain/entities/Providers';
import { ProviderRepository } from 'src/infrastructure/repositories/admin/provider.repository';
import { ContextManager } from '../agent/contextManager';
import { ToolRegister } from '../agent/toolRegister';
import { UserService } from '../user/user.service';
import { RequestResult } from '../agent/types';
import messages from '../agent/localFiles/messages.json'
import { UsernameSpecification } from 'src/application/specifications/user/user-specifications';
import { GenericMapper } from 'src/presentation/helpers/mapper-classes';
import { CreateProviderDto } from 'src/presentation/dtos/baseinfo/provider.dto';
import { RegionSpecification } from 'src/application/specifications/admin/region-specifications';
import { RegionService } from './region.service';
import { Regions } from 'src/domain/entities/Regions';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';


@Injectable()
export class ProviderService extends BaseService<Providers> {
  constructor(

    private readonly providerRepository: ProviderRepository,
    private readonly regionService:RegionService,
     private readonly history: ContextManager,
            private readonly toolRegister: ToolRegister,
            @Inject(forwardRef(() => UserService))
            private readonly userService: UserService,
  ) {
    super(providerRepository);
  } 
     onModuleInit() {
        this.toolRegister.register({
            functionName: "create_supplier",
            handler: async (param: any): Promise<RequestResult> => {

                if (param.name == undefined || param.name.replaceAll(" ", "") == "") {
                    this.history.addNewHistory({
                        status: "fault",
                        operation: "create_supplier",
                        parameters: this.history.getParams(param),
                        result: {
                            errorMessage: messages.supplier.nameisrequired
                        }
                    }, param.req.user.username)
                    throw new HttpException(messages.supplier.nameisrequired, HttpStatus.BAD_REQUEST);
                }
                  if (param.regionname == undefined || param.regionname.replaceAll(" ", "") == "") {
                    this.history.addNewHistory({
                        status: "fault",
                        operation: "create_supplier",
                        parameters: this.history.getParams(param),
                        result: {
                            errorMessage: messages.supplier.regionnameisrequired
                        }
                    }, param.req.user.username)
                    throw new HttpException(messages.supplier.regionnameisrequired, HttpStatus.BAD_REQUEST);
                }

                   const user = param.req.user;
                const user_specification = new UsernameSpecification(user.username);

                const [checkUser] = await this.userService.getWithSpecification(
                    user_specification,
                    null,
                    { id: true }
                );

                  const suppplierDto=new CreateProviderDto();
                      var regionSpecification = new RegionSpecification(this.toolRegister.normalizingName(param.regionname).trim());
                var checkRegion = await this.regionService.getWithSpecification(regionSpecification);
                if (checkRegion.length <1) {
                    this.history.addNewHistory({
                        status: "fault",
                        operation: "create_supplier",
                        parameters: this.history.getParams(param),
                        result: {
                            errorMessage: messages.supplier.regionnotfound
                        }
                    }, param.req.user.username)
                    throw new HttpException(messages.supplier.regionnotfound, HttpStatus.BAD_REQUEST);
                }
                
                        var item = GenericMapper.toEntity(Providers, suppplierDto);
                        item.firm=param.selffirm
                        item.address=param.address,
                        item.region = { id: checkRegion[0].id } as Regions;
                        item.createAt = new Date();
                        item.recordStatus = recordStatus.Active;
                        item.user = checkUser[0];
                
                        var createdSupplier = await this.add(item);
                this.history.addNewHistory({
                    status: "success",
                    operation: "create_supplier",
                    parameters: this.history.getParams(param),
                    result: {
                        "id": createdSupplier.id.toString(),
                        "name": createdSupplier.name,
                        "regionid": checkRegion[0].id.toString(),
                        "address":param.address,
                        "selffirm":param.selffirm
                    }
                }, param.req.user.username)

                return {
                    continuePrompt: undefined,
                    toolName: "create_supplier"
                }



            }
        })

        this.toolRegister.register({
            functionName: "update_region",
            handler: async (param: any): Promise<RequestResult> => {
                if (param.name == undefined || param.name.replaceAll(" ", "") == "") {
                    this.history.addNewHistory({
                        status: "fault",
                        operation: "update_region",
                        parameters: this.history.getParams(param),
                        result: {
                            errorMessage: messages.region.nameisrequired
                        }
                    }, param.req.user.username)
                    throw new HttpException(messages.region.nameisrequired, HttpStatus.BAD_REQUEST);
                }



                var specification = new RegionSpecification(this.toolRegister.normalizingName(param.name).trim());
                var checkRegion = await this.getWithSpecification(specification);
                if (checkRegion.length > 0) {
                    this.history.addNewHistory({
                        status: "fault",
                        operation: "update_region",
                        parameters: this.history.getParams(param),
                        result: {
                            errorMessage: messages.region.notfound
                        }
                    }, param.req.user.username)
                    throw new HttpException(messages.region.notfound, HttpStatus.BAD_REQUEST);
                }

                const regionDto = new UpdateRegionDto();
                const regionName = this.toolRegister.normalizingName(param.name);
                regionDto.newname = this.toolRegister.normalizingName(param.newname)?.trim() ?? checkRegion[0].name;
                regionDto.parentId = checkRegion[0].parent.id;
                if (param.newname != null && param.newname != undefined) {
                    var updatespecification = new RegionUpdateSpecification(regionDto.newname.trim(), regionDto.id);
                    var checkRegionForUpdate = await this.getWithSpecification(updatespecification);
                    if (checkRegionForUpdate.length > 0) {

                        this.history.addNewHistory({
                            status: "fault",
                            operation: "update_region",
                            parameters: this.history.getParams(param),
                            result: {
                                errorMessage: messages.region.regionalreadyexists
                            }
                        }, param.req.user.username)


                        throw new HttpException(messages.region.regionalreadyexists, HttpStatus.BAD_REQUEST);
                    }
                }
                let oldDepth = checkRegion[0].depth;

                if (regionDto.parentId !== undefined && regionDto.parentId !== null) {
                    var parentRegion = await this.getById(regionDto.parentId);
                    if (parentRegion == null) {
                        throw new HttpException("The parent region not found", HttpStatus.NOT_FOUND);
                    }
                    checkRegion[0].depth = parentRegion.depth + 1;
                    if (!checkRegion[0].parent) {
                        checkRegion[0].parent = new Regions();
                    }
                    checkRegion[0].parent.id = regionDto.parentId;
                } else {
                    checkRegion[0].depth = 0;
                    checkRegion[0].parent = null;
                }

                // If depth changed, update all children recursively
                if (checkRegion[0].depth !== oldDepth) {
                    const updateChildrenDepth = async (parent: Regions, parentDepth: number) => {
                        if (parent.regions && parent.regions.length > 0) {
                            for (const child of parent.regions) {
                                child.depth = parentDepth + 1;
                                await this.update(child);
                                await updateChildrenDepth(child, child.depth);
                            }
                        }
                    };
                    // update child depth
                    this.updateChildrenDepth(regionDto.id);

                }

                var updateRegion = await this.update(checkRegion[0]);



                this.history.addNewHistory({
                    status: "success",
                    operation: "update_region",
                    parameters: this.history.getParams(param),
                    result: {
                        "id": updateRegion.id.toString(),
                        "name": param.newName,
                        "parentid": regionDto.parentId.toString(),
                    }
                }, param.req.user.username)

                return {
                    continuePrompt: undefined,
                    toolName: "update_region"
                }

            }
        })

        this.toolRegister.register({
            functionName: "delete_region",
            handler: async (param: any): Promise<RequestResult> => {

                if (param.name == undefined || param.name.replaceAll(" ", "") == "") {
                    this.history.addNewHistory({
                        status: "fault",
                        operation: "delete_region",
                        parameters: this.history.getParams(param),
                        result: {
                            errorMessage: messages.region.nameisrequired
                        }
                    }, param.req.user.username)
                    throw new HttpException(messages.region.nameisrequired, HttpStatus.BAD_REQUEST);
                }

                const deleteProductname = this.toolRegister.normalizingName(param.name);

                var specification = new RegionSpecification(this.toolRegister.normalizingName(param.name).trim());
                var checkRegion = await this.getWithSpecification(specification);
                if (checkRegion.length < 1) {
                    this.history.addNewHistory({
                        status: "fault",
                        operation: "update_region",
                        parameters: this.history.getParams(param),
                        result: {
                            errorMessage: messages.region.notfound
                        }
                    }, param.req.user.username)
                    throw new HttpException(messages.region.notfound, HttpStatus.BAD_REQUEST);
                }

                var deleteProduct = await this.delete(checkRegion[0].id);
                this.history.addNewHistory({
                    status: "success",
                    operation: "delete_region",
                    parameters: this.history.getParams(param),
                    result: {
                        "id": checkRegion[0].id.toString(),
                        "name": deleteProductname,
                    }
                }, param.req.user.username)


                return {
                    continuePrompt: undefined,
                    toolName: "delete_region"
                };
            }
        })



        this.toolRegister.register({
            functionName: "update_region_record_status",
            handler: async (param: any): Promise<RequestResult> => {
                         if (param.name == undefined || param.name.replaceAll(" ", "") == "") {
                    this.history.addNewHistory({
                        status: "fault",
                        operation: "update_region_record_status",
                        parameters: this.history.getParams(param),
                        result: {
                            errorMessage: messages.region.nameisrequired
                        }
                    }, param.req.user.username)
                    throw new HttpException(messages.region.nameisrequired, HttpStatus.BAD_REQUEST);
                }

                var specification = new RegionSpecification(this.toolRegister.normalizingName(param.name).trim());
                var checkRegion = await this.getWithSpecification(specification);
                if (checkRegion.length <1) {
                    this.history.addNewHistory({
                        status: "fault",
                        operation: "update_region_record_status",
                        parameters: this.history.getParams(param),
                        result: {
                            errorMessage: messages.region.notfound
                        }
                    }, param.req.user.username)
                    throw new HttpException(messages.region.notfound, HttpStatus.BAD_REQUEST);
                }

                checkRegion[0].recordStatus = param.recordstatus??checkRegion[0].recordStatus;
                var updateRegion = await this.update(checkRegion[0]);
                this.history.addNewHistory({
                    status: "success",
                    operation: "update_region_record_status",
                    parameters: this.history.getParams(param),
                    result: {
                        "id": updateRegion.id.toString(),
                        "name": checkRegion[0].name,
                        "recordstatus": checkRegion[0].recordStatus.toString(),
                    }
                }, param.req.user.username)

                return {
                    continuePrompt: undefined,
                    toolName: "update_region_record_status"
                }
            }
        })

          this.toolRegister.register({
            functionName: "change_region_parent",
            handler: async (param: any): Promise<RequestResult> => {
                         if (param.name == undefined || param.name.replaceAll(" ", "") == "") {
                    this.history.addNewHistory({
                        status: "fault",
                        operation: "change_region_parent",
                        parameters: this.history.getParams(param),
                        result: {
                            errorMessage: messages.region.nameisrequired
                        }
                    }, param.req.user.username)
                    throw new HttpException(messages.region.nameisrequired, HttpStatus.BAD_REQUEST);
                }

                var specification = new RegionSpecification(this.toolRegister.normalizingName(param.name).trim());
                var checkRegion = await this.getWithSpecification(specification);
                if (checkRegion.length <1) {
                    this.history.addNewHistory({
                        status: "fault",
                        operation: "change_region_parent",
                        parameters: this.history.getParams(param),
                        result: {
                            errorMessage: messages.region.notfound
                        }
                    }, param.req.user.username)
                    throw new HttpException(messages.region.notfound, HttpStatus.BAD_REQUEST);
                }

                    var specification = new RegionSpecification(this.toolRegister.normalizingName(param.parentname).trim());
                var parentcheckRegion = await this.getWithSpecification(specification);
                if (parentcheckRegion.length <1) {
                    this.history.addNewHistory({
                        status: "fault",
                        operation: "change_region_parent",
                        parameters: this.history.getParams(param),
                        result: {
                            errorMessage: messages.region.parentnamenotfound
                        }
                    }, param.req.user.username)
                    throw new HttpException(messages.region.parentnamenotfound, HttpStatus.BAD_REQUEST);
                }

                checkRegion[0].parent = parentcheckRegion[0];
                var updateRegion = await this.update(checkRegion[0]);
                this.history.addNewHistory({
                    status: "success",
                    operation: "change_region_parent",
                    parameters: this.history.getParams(param),
                    result: {
                        "id": updateRegion.id.toString(),
                        "name": checkRegion[0].name,
                        "parentname":parentcheckRegion[0].name
                    }
                }, param.req.user.username)

                return {
                    continuePrompt: undefined,
                    toolName: "change_region_parent"
                }
            }
        })

    }
}