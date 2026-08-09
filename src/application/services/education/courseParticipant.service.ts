import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { CourseParticipants } from 'src/domain/entities/CourseParticipants';
import { CourseParticipantRepository } from 'src/infrastructure/repositories/education/courseParticipant.repository';
import { Personnels } from 'src/domain/entities/Personnels';

@Injectable()
export class CourseParticipantService extends BaseService<CourseParticipants> {
  constructor(

    private readonly courseParticipantRepository: CourseParticipantRepository,
  ) {
    super(courseParticipantRepository);
  }

  async getQualifiedParticipants(courseId: number): Promise<Personnels[]> {
    return await this.courseParticipantRepository.getQualifiedParticipants(courseId);
  }



}