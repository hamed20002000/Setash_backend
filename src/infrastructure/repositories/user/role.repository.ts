import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { RoleListDto } from 'src/presentation/dtos/user/role.dto';

@Injectable()
export class RoleRepository extends BaseRepository<Roles> {
  constructor(@InjectRepository(Roles) repository: Repository<Roles>) {
    super(repository);
  }


  async getRoleWithOperations(roleId: number): Promise<Roles> {
    return this.repository.findOne({
      where: { id: roleId },
      relations: [
        'roleMenuOperations',
        'roleMenuOperations.menuOperation',
        'roleMenuOperations.menuOperation.systemOperation',
      ],
    } as any); // اضافه کردن as any برای رفع خطای تایپ اسکریپت
  }

    async getRoleWithName(roleName: string): Promise<Roles> {
    const role=await this.repository.findOne({
      where: { roleName: roleName },
      
    } as any); // اضافه کردن as any برای رفع خطای تایپ اسکریپت
    return role
  }

}
