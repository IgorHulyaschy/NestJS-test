import { Inject, Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'
import { TYPES } from './constants'

import { Options } from './interfaces'

@Injectable()
export class BcryptService {
  private readonly saltRounds: number
  constructor(@Inject(TYPES.Options) { saltRounds }: Options) {
    this.saltRounds = saltRounds
  }
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds)
  }

  compare(password, passwordHash): Promise<boolean> {
    return bcrypt.compare(password, passwordHash)
  }
}
