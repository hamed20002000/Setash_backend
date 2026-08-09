import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  
  @ValidatorConstraint({ name: 'IsUsernameValid', async: false })
  export class IsUsernameValidConstraint implements ValidatorConstraintInterface {
    validate(username: any, args: ValidationArguments) {
      const object = args.object as any;
      if (object.registerType === 0) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username); // Email regex
      } else if (object.registerType === 1) {
        return /^\+[1-9]\d{1,14}$/.test(username); // Phone regex (E.164 format)
      }
      return false;
    }
  
    defaultMessage(args: ValidationArguments) {
      const object = args.object as any;
      if (object.registerType === 0) {
        return 'Username must be a valid email address. For example: example@example.com';
      } else if (object.registerType === 1) {
        return 'Username must be a valid phone number in international format. For example: +1234567890';
      }
      return 'Invalid username format.';
    }
  }
  
  export function IsUsernameValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsUsernameValidConstraint,
      });
    };
  }

  export function IsNotReservedUsername(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "isNotReservedUsername",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: string, args: ValidationArguments) {
                    const reservedUsernames = [
                        "admin",
                        "admin1",
                        "admin2",
                        "administrator",
                        "root",
                        "superuser",
                    ];
                    return !reservedUsernames.includes(value.toLowerCase());
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.value} is a reserved username and cannot be used.`;
                },
            },
        });
    };
}
  