import { DynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConfigService } from './config'
import { UserModule } from './user'
import { AuthModule } from './auth'

@Module({})
export class AppModule {
  static register(config: ConfigService): DynamicModule {
    return {
      module: this,
      imports: [
        TypeOrmModule.forRoot(config.get('typeorm')),
        AuthModule.register(config),
        UserModule.register(config),
      ],
    }
  }
}
