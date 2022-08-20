import { Credentials } from 'src/credentials/Credentials'
import { Role } from 'src/user/types'
import { User as UserAggregate } from 'src/user/User'

export interface CreateUser {
  subordinates: UserAggregate[]
  credentials: Credentials
  role?: Role
  boss?: UserAggregate
}

export interface User extends CreateUser {
  id: string
}

export interface UserAggregated extends Omit<CreateUser, 'credentials'> {
  id: string
  credentials: Omit<Credentials, 'password' | 'id'>
}

export interface AdminData {
  id: string
  subordinates: Array<{
    id: string
    role: Role
    bossId: string
    credentialsId: string
    fname: string
    lname: string
  }>
  bossId: string
  credentialsId: string
  fname: string
  lname: string
  role: string
}
