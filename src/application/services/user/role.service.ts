import { Body, HttpException, HttpStatus, Injectable, OnModuleInit,Inject,forwardRef } from '@nestjs/common';
import { BaseService } from '../base.service';
import { Roles } from 'src/domain/entities/Roles';
import { RoleRepository } from 'src/infrastructure/repositories/user/role.repository';
import { RoleMenuOperations } from 'src/domain/entities/RoleMenuOperations';
import { RoleMenuOperationRepository } from 'src/infrastructure/repositories/user/role-menu-operation.repository';
import { ToolRegister } from '../agent/toolRegister';
import { UsernameSpecification } from 'src/application/specifications/user/user-specifications';
import { MenuOperationsSpecification } from 'src/application/specifications/admin/menu-operation-specifications';
import { UserService } from './user.service';
import { MenuOperationService } from '../admin/menu-operation.service';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';
import { RoleSpecification } from 'src/application/specifications/user/role-specifications';
import { GenericMapper } from 'src/presentation/helpers/mapper-classes';
import { CreateRoleDto, DeleteRoleDto, RoleListDto, UpdateRoleDto } from 'src/presentation/dtos/user/role.dto';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { registerUserDto } from 'src/presentation/dtos/user/register-user.dto';
import { Users } from 'src/domain/entities/Users';
import { PasswordService } from '../helper/password.service';
import { RoleNamesSpecification } from 'src/application/specifications/user/role-specifications';
import { UserDto } from 'src/presentation/dtos/user/user.dto';


@Injectable()
export class RoleService extends BaseService<Roles> implements OnModuleInit {
  constructor(

    private readonly roleRepository: RoleRepository,
    private readonly roleMenuOperationsRepository: RoleMenuOperationRepository,
    private readonly toolRtegister: ToolRegister,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  



  ) {
    super(roleRepository);
  }

  onModuleInit() {
    this.toolRtegister.register({
      functionName: "create_role",
      handler: async (param: any): Promise<void> => {

      if(param.name==undefined||param.name.replaceAll(" ","")==""){
          throw new HttpException("The role name is required!", HttpStatus.BAD_REQUEST);
        }


        var roleDto = new CreateRoleDto();
        roleDto.name = this.normalizingName(param.name);
        var user = param.req.user;
        const user_specification = new UsernameSpecification(user.username);
        var checkUser = await this.userService.getWithSpecification(user_specification, null,
          {
            id: true

          });
        var specification = new RoleSpecification(param.name);
        var checkRole = await this.getWithSpecification(specification);
        if (checkRole.length > 0) {
          throw new HttpException("The role already exist", HttpStatus.BAD_REQUEST);
        }
        var role = GenericMapper.toEntity(Roles, roleDto);
        role.createAt = new Date();
        role.recordStatus = recordStatus.Active;
        role.user = checkUser[0];

        var createRole = await this.add(role);
        var result = GenericMapper.toDto(RoleListDto, createRole, { excludeExtraneousValues: true });
        return;
      }
    })

    this.toolRtegister.register({
      functionName: "update_role",
      handler: async (param: any): Promise<void> => {
           if(param.name==undefined||param.name.replaceAll(" ","")==""||param.newname==undefined||param.newname.replaceAll(" ","")==""){
          throw new HttpException("The role name and newName is required!", HttpStatus.BAD_REQUEST);
        }
        var roleDto = new UpdateRoleDto();
        roleDto.name = this.normalizingName(param.name);
        roleDto.newname = this.normalizingName(param.newname);
        roleDto.recordStatus = param.recordStatus;

       


        var specification = new RoleSpecification(roleDto.name);
        var checkRole = await this.getWithSpecification(specification);
        if (checkRole.length < 1) {
          throw new HttpException("The role is not found!", HttpStatus.NOT_FOUND);
        }
        checkRole[0].name = roleDto.newname ?? checkRole[0].name;
        checkRole[0].recordStatus = roleDto.recordStatus ?? checkRole[0].recordStatus;

        var updateRole = await this.update(checkRole[0]);
        var result = GenericMapper.toDto(RoleListDto, updateRole, { excludeExtraneousValues: true });
        return;
      }
    })


    this.toolRtegister.register({
      functionName: "delete_role",
      handler: async (param: any): Promise<boolean> => {

           if(param.name==undefined||param.name.replaceAll(" ","")==""){
          throw new HttpException("The role name is required!", HttpStatus.BAD_REQUEST);
        }


        var roleDto = new DeleteRoleDto();
        roleDto.name = this.normalizingName(param.name);


        var specification = new RoleSpecification(roleDto.name);
        var checkRole = await this.getWithSpecification(specification);
        if (checkRole.length < 1) {
          throw new HttpException("The role is not found!", HttpStatus.NOT_FOUND);
        }

        var createRole = await this.delete(checkRole[0].id);
        return true;
      }
    })

    this.toolRtegister.register({
      functionName: "update_role_record_status",
      handler: async (param: any): Promise<void> => {
        var roleDto = new UpdateRoleDto();
        roleDto.name = param.name;
        roleDto.recordStatus=param.recordStatus;
        
        if(roleDto.name==undefined||roleDto.name.replaceAll(" ","")==""){
          throw new HttpException("The role name is required!", HttpStatus.BAD_REQUEST);
        }
        var specification = new RoleSpecification(roleDto.name);
        var checkRole = await this.getWithSpecification(specification);
        if (checkRole.length < 1) {
          throw new HttpException("The role is not found!", HttpStatus.NOT_FOUND);
        }
        checkRole[0].recordStatus = roleDto.recordStatus ?? checkRole[0].recordStatus;

        var updateRole = await this.update(checkRole[0]);
        var result = GenericMapper.toDto(RoleListDto, updateRole, { excludeExtraneousValues: true });
        return;
      }
    })

  

  }
  async assignOperationsToRole(param: any): Promise<void> {

      const role=await this.roleRepository.getRoleWithName(param.roleName);
    // حذف عملیات قبلی مرتبط با این Role
    await this.roleMenuOperationsRepository.deleteByRoleId(role.id);

      //const selectedSystemOperation=await this.systemOperation.getSpecialOperationWithName(param.parameters);
         const items: RoleMenuOperations[] = [];
    //for (const op of selectedSystemOperation) {
      // const item = new RoleMenuOperations();
      // item.role = role;
      // item.menuOperation = op;
      // item.user = checkUser[0];
      // item.createAt = new Date();
      // item.recordStatus = recordStatus.Active;
      // items.push(item);
   // }
    
    // ذخیره عملیات جدید
    //await this.sysz.addMany(items);
  }
  async getRoleWithOperations(roleId: number): Promise<Roles> {
    return this.roleRepository.getRoleWithOperations(roleId);
  }
  normalizingName(name:string):string{

      return name.replace(/\brolü(nü|ne|ni|na|nun|nün|nın|nin)?\b/giu, "")
          .replace(/\brol\b/giu, "")
          .trim();
  }
}