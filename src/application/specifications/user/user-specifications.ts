// src/domain/specifications/user.specification.ts


import { Users } from 'src/domain/entities/Users';
import { Specification } from 'src/domain/specifications/base.specification';
import { MoreThan } from 'typeorm';

export class UserSpecification extends Specification<Users> {
  constructor(
    private readonly username: string,
      // Password is optional for some queries
  ) {
    super();
  }

  isSatisfiedBy(entity: Users): boolean {
    const matchesUsername = entity.username === this.username;
   
    return matchesUsername;
  }

  toWhereClause(): Partial<Record<keyof Users, any>> {
    const whereClause: Partial<Record<keyof Users, any>> = {};
    if (this.username) {
      whereClause.username = this.username;
    }
   
    return whereClause;
  }
}



export class UsernameSpecification extends Specification<Users> {
  constructor(private readonly username: string) {
    super();
  }

  isSatisfiedBy(user: Users): boolean {
    return user.username === this.username ;
  }

  toWhereClause(): Partial<Record<keyof Users, any>> {
    return {
      username: this.username
      
    };
  }
}

export class UsernameAndPasswordSpecification extends Specification<Users> {
  constructor(private readonly username: string,private readonly password:string) {
    super();
  }

  isSatisfiedBy(user: Users): boolean {
    return user.username === this.username && user.password==this.password;
  }

   toWhereClause(): Partial<Record<keyof Users, any>> {
    return {
      username: this.username,
      password: this.password
    };
  }
}







