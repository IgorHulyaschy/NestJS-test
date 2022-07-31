import { DynamicModule, Module } from '@nestjs/common'
import { ConfigService } from 'src/config'
import { CredentialsModule } from 'src/credentials'
import { UserController } from './UserController'
import { UserMapper } from './UserMapper'
import { UserRepository } from './UserRepository'
import { UserService } from './UserService'

@Module({})
export class UserModule {
  static register(config: ConfigService): DynamicModule {
    return {
      module: this,
      imports: [CredentialsModule.register(config)],
      providers: [UserMapper, UserRepository, UserService],
      controllers: [UserController],
      exports: [UserService],
    }
  }
}
