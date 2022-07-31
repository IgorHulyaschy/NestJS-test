import { Injectable } from '@nestjs/common'
import { UserDto } from 'src/dto'
import { User } from './User'

@Injectable()
export class UserMapper {
  toAggregatedDto(u: User[]): UserDto.UserAggregated[]
  toAggregatedDto(u: User | User[]): UserDto.UserAggregated[] {
    if (!Array.isArray(u)) return this.toAggregatedDto([u])
    return u.map((user) => {
      return {
        id: user.id,
        subordinates: user.subordinates,
        credentials: {
          fname: user.credentials.fname,
          lname: user.credentials.lname,
          email: user.credentials.email,
        },
        role: user.role,
        boss: user.boss,
      }
    })
  }

  toDto(u: User): UserDto.User {
    return {
      id: u.id,
      credentials: u.credentials,
      role: u.role,
      boss: u.boss,
      subordinates: u.subordinates,
    }
  }
}
