
import { PersonnelWorkPlaces } from 'src/domain/entities/PersonnelWorkPlaces';
import { WorkPlaceType } from 'src/domain/enums/workPlaceType.enum';
import { Specification } from 'src/domain/specifications/base.specification';

export class PersonnelWorkPlacesSpecification extends Specification<PersonnelWorkPlaces> {
  constructor(
    private readonly personnelId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: PersonnelWorkPlaces): boolean {
    return entity.personnel.id === this.personnelId;
  }

  toWhereClause(): Partial<Record<keyof PersonnelWorkPlaces, any>> {
    return { id: this.personnelId };
  }
}

export class PersonnelWorkPlacesByIdSpecification extends Specification<PersonnelWorkPlaces> {
  constructor(
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: PersonnelWorkPlaces): boolean {
    return entity.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof PersonnelWorkPlaces, any>> {
    return { id: this.id };
  }
}


export class PersonnelWorkPlacesBytypeAndPlaceIdSpecification extends Specification<PersonnelWorkPlaces> {
  constructor(
    private readonly placeId: number,private readonly type:WorkPlaceType
  ) {
    super();
  }

  isSatisfiedBy(entity: PersonnelWorkPlaces): boolean {
    return entity.placeId === this.placeId && entity.type === this.type;
  }

  toWhereClause(): Partial<Record<keyof PersonnelWorkPlaces, any>> {
    return { placeId: this.placeId, type: this.type };
  }
}

export class PersonnelWorkPlacesBytypeAndUserRoleIdSpecification extends Specification<PersonnelWorkPlaces> {
  constructor(
    private readonly userRoleId: string,private readonly type:WorkPlaceType
  ) {
    super();
  }

  isSatisfiedBy(entity: PersonnelWorkPlaces): boolean {
    return entity.userRole.id === this.userRoleId && entity.type === this.type;
  }

  toWhereClause(): Partial<Record<keyof PersonnelWorkPlaces, any>> {
    return { userRole: { id: this.userRoleId }, type: this.type };
  }
}









