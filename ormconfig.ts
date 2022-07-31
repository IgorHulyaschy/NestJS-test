import { ConnectionOptions } from 'typeorm'
import { User } from 'src/user/User'
import { Credentials } from 'src/credentials/Credentials'

const config: ConnectionOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL ?? 'postgres://localhost/test',
  entities: [User, Credentials],
  synchronize: true,
  migrations: ['./migrations/**/*.ts'],
  cli: {
    migrationsDir: './migrations',
  },
}

export = config
