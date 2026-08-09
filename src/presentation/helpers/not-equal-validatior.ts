import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'notEqual', async: false })
export class NotEqualValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const forbiddenValues = args.constraints;
    return !forbiddenValues.includes(value.toLowerCase());
  }

  defaultMessage(args: ValidationArguments) {
    return `Name cannot be one of the following: ${args.constraints.join(', ')}`;
  }
}