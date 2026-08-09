import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { CommiteMembers } from 'src/domain/entities/CommiteMembers';
import { CommiteMembersRepository } from 'src/infrastructure/repositories/report/commiteMember.repository';

@Injectable()
export class CommiteMembersService extends BaseService<CommiteMembers> {
  constructor(

    private readonly itemRepository: CommiteMembersRepository,
  ) {
    super(itemRepository);
  }


}