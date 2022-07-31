import { Injectable, PipeTransform } from '@nestjs/common'
import { AuthDto } from 'src/dto'
import { ValidationError } from './ValidationError'

@Injectable()
export class SignInPipe implements PipeTransform {
  transform(value: AuthDto.SignIn): AuthDto.SignIn {
    if (!value.email || !value.password) throw new ValidationError()
    return value
  }
}
