import { Repository } from 'src/utils'

import { Credentials } from './Credentials'

export class CredentialsRepository extends Repository<Credentials>(Credentials) {}
