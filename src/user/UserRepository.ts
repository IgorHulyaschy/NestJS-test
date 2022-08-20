import { UserDto } from 'src/dto'
import { Repository } from 'src/utils'
import { getManager } from 'typeorm'
import { Role } from './types'
import { User } from './User'

export class UserRepository extends Repository<User>(User) {
  async update(id: string, newValues: Partial<User>, em = getManager()): Promise<void> {
    await em.update(User, { id }, newValues)
  }

  async getAggregatedSubordinate(id: string, em = getManager()): Promise<User> {
    return em
      .createQueryBuilder(User, 'u')
      .innerJoinAndSelect('u.credentials', 'c')
      .innerJoinAndSelect('u.boss', 'b')
      .where('u.id = :id', { id })
      .getOne()
  }

  async getAggregatedBoss(id: string, em = getManager()): Promise<User> {
    return em
      .createQueryBuilder(User, 'u')
      .innerJoinAndSelect('u.credentials', 'c')
      .innerJoinAndSelect('u.subordinates', 's')
      .where('u.id = :id', { id })
      .getOne()
  }

  async getAggregatedAdmin(em = getManager()): Promise<UserDto.AdminData[]> {
    const res: Array<{
      id: string
      role: Role
      bossId: string
      credentialsId: string
      fname: string
      lname: string
    }> = await em.query(`
        with recursive r as (
        select "user".id, "user".role, "bossId", "credentialsId", c.fname, c.lname
        from "user"
        join credentials c on "user"."credentialsId" = c.id
    
        UNION ALL
    
        select u.id, u.role, u."bossId", u."credentialsId", cr.lname, cr.fname
        from "user" u
        join credentials cr on u."credentialsId" = cr.id
        JOIN r on u."bossId" = r.id
        ) select * from r;
      `)
    return res.reduce((acc: UserDto.AdminData[], user) => {
      return acc.findIndex((u) => u.id === user.id) === -1
        ? acc.concat({
            id: user.id,
            subordinates: res
              .filter((s) => s.bossId === user.id)
              .reduce(
                (
                  acc: Array<{
                    id: string
                    role: Role
                    bossId: string
                    credentialsId: string
                    fname: string
                    lname: string
                  }>,
                  u
                ) => {
                  return acc.findIndex((sub) => sub.id === u.id) === -1 ? acc.concat(u) : acc
                },
                []
              ),
            bossId: user.bossId,
            credentialsId: user.credentialsId,
            role: user.role,
            fname: user.fname,
            lname: user.lname,
          })
        : acc
    }, [])
  }
}
