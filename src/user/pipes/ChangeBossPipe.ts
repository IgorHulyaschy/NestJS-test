import { Injectable, PipeTransform } from '@nestjs/common'
import { ValidationError } from './ValidationError'

@Injectable()
export class ChangeBossPipe implements PipeTransform {
  transform(value: { bossId: string }): { bossId: string } {
    if (!value.bossId || typeof value.bossId !== 'string') throw new ValidationError()
    return value
  }
}
