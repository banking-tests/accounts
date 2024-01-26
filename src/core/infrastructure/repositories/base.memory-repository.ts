import type DataStore = require("nedb-promises");
import { Injectable } from "@nestjs/common";

import { Crud } from "@/core/domain/crud.interface";
import { Entity } from "@/core/domain/entity";
import { Pagination } from "@/core/domain/pagination";
import { BaseRepositoryOptions } from "@/core/infrastructure/repositories/base.repository.options";
import { QueryParsedOptions } from "@/core/types/general/query-parsed-options.type";

@Injectable()
export class BaseMemoryRepository<I, E extends Entity<I>>
  implements Crud<I, E>
{
  constructor(
    private readonly store: DataStore<I>,
    private readonly entityClass: new (data: I) => E,
    private options?: BaseRepositoryOptions
  ) {
    if (!options || options.softDelete === false) {
      this.options = {
        softDelete: undefined,
      };
    } else if (options.softDelete === true) {
      this.options = {
        softDelete: false,
      };
    }
  }

  public async create(contract: I): Promise<E> {
    const document = await this.store.insert(contract);
    if (document) {
      return this.mapToEntity(document);
    }
  }

  public find(
    filter?: Partial<I>,
    projection?: any,
    options?: QueryParsedOptions
  ): Promise<E[]> {
    const q = { ...filter } as any;

    if (this.options?.softDelete !== undefined) {
      q.isDeleted = this.options.softDelete;
    }

    const query = this.store.find(q, projection);

    if (options?.sort) {
      query.sort(options.sort);
    }

    if (options?.limit) {
      query.limit(options.limit);
    }

    if (options?.offset) {
      query.skip(options.offset);
    }

    return query
      .exec()
      .then((documents) =>
        documents.map((document) => this.mapToEntity(document))
      );
  }

  public async findOne(filter?: Partial<I>, projection?: any): Promise<E> {
    const q = { ...filter } as any;

    if (this.options?.softDelete !== undefined) {
      q.isDeleted = this.options.softDelete;
    }

    const doc = await this.store.findOne(q, projection);

    if (doc) {
      return this.mapToEntity(doc);
    }

    return undefined;
  }

  public findById(uuid: string, projection?: any): Promise<E> {
    return this.store
      .findOne({ uuid, isDeleted: false }, projection)
      .then((document) => this.mapToEntity(document));
  }

  public trash(
    filter?: Partial<I>,
    projection?: any,
    options?: QueryParsedOptions
  ): Promise<E[]> {
    const q = { ...filter } as any;

    if (this.options?.softDelete !== undefined) {
      q.isDeleted = this.options.softDelete;
    }

    const query = this.store.find(q, projection);

    if (options.sort) {
      q.sort(options.sort);
    }

    if (options.limit) {
      q.limit(options.limit);
    }

    if (options.offset) {
      q.skip(options.offset);
    }

    return query.then((documents) =>
      documents.map((document) => this.mapToEntity(document))
    );
  }

  public all(
    filter?: Partial<I>,
    projection?: any,
    options?: QueryParsedOptions
  ): Promise<E[]> {
    const query = this.store.find(filter, projection);

    if (options.sort) {
      query.sort(options.sort);
    }

    if (options.limit) {
      query.limit(options.limit);
    }

    if (options.offset) {
      query.skip(options.offset);
    }

    return query.then((documents) =>
      documents.map((document) => this.mapToEntity(document))
    );
  }

  public async scan(
    filter?: Partial<I>,
    projection?: any,
    options?: QueryParsedOptions
  ): Promise<E> {
    const query = this.store.find(filter, projection);

    if (options.sort) {
      query.sort(options.sort);
    }

    if (options.limit) {
      query.limit(options.limit);
    }

    if (options.offset) {
      query.skip(options.offset);
    }

    const document = await query;
    return this.mapToEntity(document as I);
  }

  public update(filter: Partial<I>, payload: Partial<I>): Promise<E> {
    return this.store
      .update(filter, payload, { returnUpdatedDocs: true, multi: false })
      .then((document) => this.mapToEntity(document as I));
  }

  public delete(filter: Partial<I>): Promise<boolean> {
    return this.store
      .remove(filter, { multi: false })
      .then((document) => !!document);
  }

  public findManyByUuids(uuids: string[]): Promise<E[]> {
    return this.store
      .find({ uuid: { $in: uuids }, isDeleted: false })
      .then((documents) =>
        documents.map((document) => this.mapToEntity(document))
      );
  }

  public createMany(contract: I[]): Promise<E[]> {
    return this.store
      .insertMany(contract)
      .then((documents) =>
        documents.map((document) => this.mapToEntity(document))
      );
  }

  public deleteMany(filter: Partial<I>): Promise<boolean> {
    return this.store
      .remove(filter, { multi: true })
      .then((document) => !!document);
  }

  public count(filter?: Partial<I>): Promise<number> {
    return this.store.count(filter);
  }

  public softDelete(filter: Partial<I>): Promise<boolean> {
    return this.store
      .update(filter, { isDeleted: true })
      .then((document) => !!document);
  }

  public restore(filter: Partial<I>): Promise<E> {
    return this.store
      .updateOne(filter, { isDeleted: false })
      .then((document) => this.mapToEntity(document as I));
  }

  public restoreMany(filter: Partial<I>): Promise<E[]> {
    return this.store
      .updateMany(
        filter,
        { isDeleted: false },
        { returnUpdatedDocs: true, multi: true }
      )
      .then((documents) => {
        return documents.map((document) => this.mapToEntity(document as I));
      });
  }

  public exists(filter: Partial<I>): Promise<boolean> {
    return this.store.count(filter).then((count) => count > 0);
  }

  public async existsMany(filter: Partial<I>): Promise<string[]> {
    const rows = await this.store.find(filter as I, { uuid: 1 }).exec();

    if (rows.length > 0) {
      return rows.map((row) => row.uuid as string);
    }

    return undefined;
  }

  public async existsByUuids(uuids: string[]): Promise<string[]> {
    const rows = await this.store
      .find(
        {
          uuid: { $in: uuids },
        } as I,
        { uuid: 1 }
      )
      .exec();

    if (rows.length > 0) {
      return rows.map((row) => row.uuid as string);
    }

    return undefined;
  }

  public async paginate(
    filter: Partial<I>,
    options: QueryParsedOptions
  ): Promise<Pagination<E>> {
    const total = await this.store.count(filter as I);
    const docs = await this.store
      .find(filter as I)
      .skip(options.offset)
      .limit(options.limit)
      .sort(options.sort)
      .exec()
      .then((documents) =>
        documents.map((document) => this.mapToEntity(document))
      );

    const pages = Math.ceil(total / options.limit);
    const page = Math.ceil(options.offset / options.limit) + 1;
    const limit = options.limit;

    return {
      limit,
      docs,
      total,
      pages,
      page,
      offset: options.offset,
      nextPage: page < pages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      hasMore: page < pages,
    };
  }

  private mapToEntity(data: any): E {
    return new this.entityClass(data);
  }
}
