import { Injectable, PipeTransform } from '@nestjs/common'
import { AuthDto } from 'src/dto'
import { ValidationError } from './ValidationError'

@Injectable()
export class SignUpPipe implements PipeTransform {
  transform(value: AuthDto.SignUp): AuthDto.SignUp {
    if (!value.email || !value.fname || !value.lname || !value.password) throw new ValidationError()
    return value
  }
}
