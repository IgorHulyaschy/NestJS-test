import { UnprocessableEntityException } from '@nestjs/common'

export class ValidationError extends UnprocessableEntityException {
  constructor() {
    super('Validation error')
  }
}
