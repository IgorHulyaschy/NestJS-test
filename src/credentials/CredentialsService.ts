import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { BcryptService } from 'src/bcrypt'
import { CredentialsDto } from 'src/dto'
import { NotUnique } from 'src/utils/errors'
import { Credentials } from './Credentials'

import { CredentialsMapper } from './CredentialsMapper'
import { CredentialsRepository } from './CredentialsRepository'
import { UserWithSuchEmailAlreadyExistsError } from './errors'

@Injectable()
export class CredentialsService {
  constructor(
    private readonly repository: CredentialsRepository,
    private readonly mapper: CredentialsMapper,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService
  ) {}

  async get(email: string): Promise<CredentialsDto.Credentials | null> {
    const credentials = await this.repository.findOne({ email })
    if (!credentials) return null

    return this.mapper.toDto(credentials)
  }

  async validateCredentials(
    email: string,
    password: string
  ): Promise<{ isValidPass: boolean; credentials: CredentialsDto.Credentials }> {
    const credentials = await this.get(email)
    let isValidPass: boolean
    if (!credentials) isValidPass = false
    isValidPass = await this.bcryptService.compare(password, credentials.password)
    return { isValidPass, credentials }
  }

  async create(dto: CredentialsDto.CreateCredentials): Promise<string> {
    const passwordHash = await this.bcryptService.hash(dto.password)
    const credentials = new Credentials({ ...dto, password: passwordHash })
    try {
      await this.repository.save(credentials)
      return credentials.id
    } catch (err) {
      if (err instanceof NotUnique) throw new UserWithSuchEmailAlreadyExistsError()
      throw err
    }
  }

  createToken(id: string): string {
    return this.jwtService.sign({ id }, { expiresIn: '24h' })
  }

  validateToken(token: string): Promise<{ id: string }> {
    return this.jwtService.verify(token)
  }
}
