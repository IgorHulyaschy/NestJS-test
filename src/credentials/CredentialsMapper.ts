import { Injectable } from '@nestjs/common'
import { CredentialsDto } from 'src/dto'
import { Credentials } from './Credentials'

@Injectable()
export class CredentialsMapper {
  toDto(c: Credentials): CredentialsDto.Credentials {
    return {
      id: c.id,
      fname: c.fname,
      lname: c.lname,
      email: c.email,
      password: c.password,
    }
  }
}
