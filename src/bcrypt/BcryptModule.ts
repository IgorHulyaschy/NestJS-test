import { DynamicModule, Module } from '@nestjs/common'

import { BcryptService } from './BcryptService'
import { TYPES } from './constants'
import { Options } from './interfaces'

@Module({})
export class BcryptModule {
  static register(options: Options): DynamicModule {
    return {
      module: this,
      providers: [
        {
          provide: TYPES.Options,
          useValue: options,
        },
        BcryptService,
      ],
      exports: [BcryptService],
    }
  }
}
