/* eslint-disable prettier/prettier */
import { CredentialsDto } from 'src/dto'
import { Column, Entity, Index, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity()
export class Credentials {
  @PrimaryColumn({ default: uuid(), unique: true })
  id: string

  @Column()
  fname: string

  @Column()
  lname: string

  @Column()
  @Index({ unique: true })
  email: string

  @Column()
  password: string

  constructor(data?: CredentialsDto.CreateCredentials) {
    if(data) {    
      this.id = uuid(),
      this.fname = data.fname,
      this.lname = data.lname,
      this.email = data.email,
      this.password = data.password
    }
  }
}
