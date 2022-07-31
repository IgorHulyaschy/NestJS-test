import { NestFactory } from '@nestjs/core'

import { AppModule } from './AppModule'
import { ConfigService } from './config'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule.register(new ConfigService()))
  await app.listen(3000)
}
bootstrap()
