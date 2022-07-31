import { Injectable } from '@nestjs/common'

import { AuthDto } from 'src/dto'
import { UserService } from 'src/user'

import { CredentialsService } from '../credentials'
import { WrongCredentialsError } from './errors'

@Injectable()
export class AuthService {
  constructor(
    private readonly credentialsService: CredentialsService,
    private readonly userService: UserService
  ) {}

  async validateCredentials(email: string, password: string): Promise<string> {
    const { isValidPass, credentials } = await this.credentialsService.validateCredentials(
      email,
      password
    )
    const user = await this.userService.getUserByCredentials(credentials)
    if (!isValidPass || !user) throw new WrongCredentialsError()
    return this.credentialsService.createToken(user.id)
  }

  async signUp({ bossId, ...dto }: AuthDto.SignUp): Promise<string> {
    const credentialsId = await this.credentialsService.create(dto)
    const boss = await this.userService.raiseToBigBoss(bossId)
    return this.userService.create({
      credentials: { ...dto, id: credentialsId },
      boss: boss ?? undefined,
      subordinates: [],
    })
  }
}
