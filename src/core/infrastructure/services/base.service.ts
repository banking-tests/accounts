import { Crud } from "@/core/domain/crud.interface";
import { Entity } from "@/core/domain/entity";
import { BaseProps } from "@/core/domain/interfaces/base-props.interface";
import { Filter } from "@/core/domain/interfaces/filter.interface";
import { Pagination } from "@/core/domain/pagination";
import { Json } from "@/core/types/general/json.type";
import { QueryParsedOptions } from "@/core/types/general/query-parsed-options.type";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BaseService<I extends BaseProps, E extends Entity<I>>
  implements Crud<I, E>
{
  constructor(private readonly repository: Crud<I, E>) {}

  public findOne(
    filter: Filter<I>,
    projection?: Json,
    options?: QueryParsedOptions
  ): Promise<E> {
    return this.repository.findOne(filter, projection, options);
  }

  public find(
    filter?: Filter<I>,
    projection?: Json,
    options?: QueryParsedOptions
  ): Promise<E[]> {
    return this.repository.find(filter, projection, options);
  }

  public create(data: I): Promise<E> {
    return this.repository.create(data);
  }

  public async update(filter: Filter<I>, data: Partial<I>): Promise<E> {
    return this.repository.update(filter, data);
  }

  public async delete(filter: Filter<I>): Promise<boolean> {
    return this.repository.delete(filter);
  }

  public async findById(uuid: string): Promise<E> {
    return this.repository.findById(uuid);
  }

  public async findManyByUuids(uuids: string[]): Promise<E[]> {
    return this.repository.findManyByUuids(uuids);
  }

  public async createMany(contract: I[]): Promise<E[]> {
    return this.repository.createMany(contract);
  }

  public async deleteMany(filter: Filter<I>): Promise<boolean> {
    return this.repository.deleteMany(filter);
  }

  public async count(
    filter?: Filter<I>,
    options?: QueryParsedOptions
  ): Promise<number> {
    return this.repository.count(filter, options);
  }

  public async softDelete(filter: Filter<I>): Promise<boolean> {
    return this.repository.softDelete(filter);
  }

  public async restore(filter: Filter<I>): Promise<E> {
    return this.repository.restore(filter);
  }

  public async restoreMany(filter: Filter<I>): Promise<E[]> {
    return this.repository.restoreMany(filter);
  }

  public async exists(filter: Filter<I>): Promise<boolean> {
    return this.repository.exists(filter);
  }

  public async existsMany(filter: Filter<I>): Promise<string[]> {
    return this.repository.existsMany(filter);
  }

  public async existsByUuids(uuids: string[]): Promise<string[]> {
    return this.repository.existsByUuids(uuids);
  }

  public async paginate(
    filter: Filter<I>,
    options: any
  ): Promise<Pagination<E>> {
    return this.repository.paginate(filter, options);
  }
}
