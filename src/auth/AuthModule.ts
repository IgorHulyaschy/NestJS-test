import { DynamicModule, Module } from '@nestjs/common'
import { ConfigService } from 'src/config'
import { CredentialsModule } from 'src/credentials'
import { UserModule } from 'src/user'
import { AuthController } from './AuthController'
import { AuthService } from './AuthService'

@Module({})
export class AuthModule {
  static register(config: ConfigService): DynamicModule {
    return {
      module: this,
      imports: [CredentialsModule.register(config), UserModule.register(config)],
      providers: [AuthService],
      controllers: [AuthController],
    }
  }
}
