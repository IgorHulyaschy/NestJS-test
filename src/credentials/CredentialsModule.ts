import { DynamicModule, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { BcryptModule } from 'src/bcrypt'
import { ConfigService } from 'src/config'
import { CredentialsMapper } from './CredentialsMapper'
import { CredentialsRepository } from './CredentialsRepository'
import { CredentialsService } from './CredentialsService'

@Module({})
export class CredentialsModule {
  static register(config: ConfigService): DynamicModule {
    return {
      module: this,
      imports: [BcryptModule.register(config.get('bcrypt')), JwtModule.register(config.get('jwt'))],
      providers: [CredentialsMapper, CredentialsRepository, CredentialsService],
      exports: [CredentialsService],
    }
  }
}
