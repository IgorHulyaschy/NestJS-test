/* eslint-disable prettier/prettier */
import { Credentials } from 'src/credentials/Credentials'
import { UserDto } from 'src/dto'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Role } from './types'

@Entity()
export class User {
  @PrimaryColumn({ default: uuid(), unique: true })
  id: string

  @OneToOne(() => Credentials)
  @JoinColumn()
  credentials: Credentials

  @ManyToOne(() => User, (user) => user.subordinates)
  boss?: User

  @OneToMany(() => User, (user) => user.boss)
  subordinates: User[]

  @Column({ default: Role.SUBORDINATE })
  role?: Role

  constructor(data?: UserDto.CreateUser) {
    if(data) {
      this.id = uuid(),
      this.boss = data.boss,
      this.credentials = data.credentials,
      this.role = data.role,
      this.subordinates = data.subordinates
    }
  }
}
