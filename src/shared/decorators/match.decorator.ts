import { ValidationOptions, registerDecorator } from 'class-validator';
import { MatchConstraint } from '../validators/match-constraint.validator';

export const Match = (
  property: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
};
