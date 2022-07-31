import { Credentials } from 'src/credentials/Credentials'
import { User } from 'src/user/User'

export default {
  typeorm: {
    type: {
      default: 'postgres',
    },
    url: {
      format: String,
      default: 'postgres://localhost/test',
      sensitive: true,
      env: 'POSTGRES_URL',
    },
    entities: [Credentials, User],
  },
  bcrypt: {
    saltRounds: {
      format: Number,
      default: 10,
      env: 'BCRYPT_SALTROUNDS',
    },
  },
  jwt: {
    secret: {
      format: String,
      default: 'secret',
      env: 'JWT_SECRET',
    },
  },
} as const
