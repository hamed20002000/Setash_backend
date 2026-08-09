// src/shared/specification/specification.ts
export abstract class Specification<T> {
  abstract isSatisfiedBy(entity: T): boolean;

  // Add a method to generate TypeORM query filters
  abstract toWhereClause(): Partial<Record<keyof T, any>>;

  and(spec: Specification<T>): Specification<T> {
    return new AndSpecification(this, spec);
  }
}

class AndSpecification<T> extends Specification<T> {
  constructor(
    private readonly left: Specification<T>,
    private readonly right: Specification<T>
  ) {
    super();
  }

  isSatisfiedBy(entity: T): boolean {
    return this.left.isSatisfiedBy(entity) && this.right.isSatisfiedBy(entity);
  }

  toWhereClause(): Partial<Record<keyof T, any>> {
    return {
      ...this.left.toWhereClause(),
      ...this.right.toWhereClause(),
    };
  }
}
