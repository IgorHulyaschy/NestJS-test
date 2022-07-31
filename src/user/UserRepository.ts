import { Repository } from 'src/utils'
import { getManager } from 'typeorm'
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

  async getAggregatedAdmin(em = getManager()): Promise<User[]> {
    return em
      .createQueryBuilder(User, 'u')
      .innerJoinAndSelect('u.credentials', 'c')
      .innerJoinAndSelect('u.subordinates', 's')
      .innerJoinAndSelect('u.boss', 'b')
      .getMany()
  }
}
