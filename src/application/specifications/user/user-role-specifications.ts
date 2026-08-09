// src/domain/specifications/user.specification.ts


import { UserRoles } from 'src/domain/entities/UserRoles';
import { Users } from 'src/domain/entities/Users';
import { Specification } from 'src/domain/specifications/base.specification';
import { MoreThan } from 'typeorm';



export class UserRoleSpecification extends Specification<UserRoles> {
   constructor(
      private readonly role_name: string,private userId: string
    ) {
      super();
    }
  
    isSatisfiedBy(entity: UserRoles): boolean {
      return entity.role.name === this.role_name && entity.assigendUser.id===this.userId;
    }
  
    toWhereClause(): Partial<Record<keyof UserRoles, any>> {
      return { role:{ name: this.role_name }, assigendUser:{ id: this.userId } };
    }
}












