import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class TrueOnlyConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return value === true;
  }

  defaultMessage() {
    return 'The value must be true.';
  }
}

export function TrueOnly(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: TrueOnlyConstraint,
    });
  };
}
