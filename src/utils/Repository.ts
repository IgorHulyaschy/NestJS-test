import { Injectable } from '@nestjs/common'
import { Class } from 'type-fest'
import { getManager } from 'typeorm'
import { NotUnique } from './errors'

export interface IRepository<Entity> {
  save(entity: Entity): Promise<Entity>

  findOne(param: Partial<Entity>): Promise<Entity | undefined>
}

export function Repository<Entity>(entity: Class<Entity>): Class<IRepository<Entity>> {
  @Injectable()
  class Repos implements IRepository<Entity> {
    async findOne(param: Partial<Entity>, em = getManager()): Promise<Entity | undefined> {
      const res = await em.findOne(entity, { where: param })
      return res
    }

    async save(entity: Entity, em = getManager()): Promise<Entity> {
      return em.save(entity).catch((err) => {
        if (err.detail.includes('already exists')) throw new NotUnique()
        throw err
      })
    }
  }
  return Repos
}
