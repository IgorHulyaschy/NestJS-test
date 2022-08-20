import { Injectable } from '@nestjs/common'
import { CredentialsDto, UserDto } from 'src/dto'
import { SuchBossDoesNotExistsError } from './errors'
import { Role } from './types'

import { User } from './User'
import { UserMapper } from './UserMapper'
import { UserRepository } from './UserRepository'

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository, private readonly mapper: UserMapper) {}

  async create(dto: UserDto.CreateUser): Promise<string> {
    const user = new User(dto)
    await this.repository.save(user)
    return user.id
  }

  async get(id: string): Promise<UserDto.User | null> {
    const user = await this.repository.findOne({ id })
    if (!user) return null

    return this.mapper.toDto(user)
  }

  async raiseToBigBoss(id: string): Promise<UserDto.User | null> {
    const user = await this.get(id)
    if (!user) return null
    if (user.role === Role.ADMIN) return user
    await this.repository.update(user.id, { role: Role.BOSS })
    return user
  }

  async getAggregated(id: string): Promise<UserDto.UserAggregated[] | UserDto.AdminData[]> {
    const { role } = await this.get(id)
    let user
    if (role === Role.SUBORDINATE) user = await this.repository.getAggregatedSubordinate(id)
    if (role === Role.BOSS) user = await this.repository.getAggregatedBoss(id)
    if (role === Role.ADMIN) return this.repository.getAggregatedAdmin()
    return this.mapper.toAggregatedDto(user)
  }

  async getUserByCredentials(
    credentials: CredentialsDto.Credentials
  ): Promise<UserDto.User | undefined> {
    return this.repository.findOne({ credentials })
  }

  async changeBoss(bossId: string, subId: string): Promise<void> {
    const boss = await this.get(bossId)
    if (!boss) throw new SuchBossDoesNotExistsError()

    return this.repository.update(subId, { boss })
  }
}
