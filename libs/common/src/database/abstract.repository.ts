import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractEntity } from './abstract.schema';
import {
  EntityManager,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly entityRepository: Repository<T>,
    protected readonly entityManager: EntityManager,
  ) {}

  async create(entity: T): Promise<T> {
    return this.entityManager.save(entity);
  }

  async findOne(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
  ): Promise<T> {
    const entity = this.entityRepository.findOne({ where, relations });

    if (!entity) {
      this.logger.warn(`Entity not found`);
      throw new NotFoundException('Entity not found');
    }

    return entity;
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    update: QueryDeepPartialEntity<T>,
  ): Promise<T> {
    const updatedResult = await this.entityRepository.update(where, update);

    if (!updatedResult.affected) {
      this.logger.warn(`Entity not found`);
      throw new NotFoundException('Entity not found');
    }

    return this.entityRepository.findOne({ where });
  }

  async find(where: FindOptionsWhere<T>): Promise<T[]> {
    return this.entityRepository.find({ where });
  }

  async findOneAndDelete(where: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.entityRepository.delete(where);

    if (!entity.affected) {
      this.logger.warn(`Entity not found`);
      throw new NotFoundException('Entity not found');
    }

    return entity.raw;
  }
}
