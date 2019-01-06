import als from "async-local-storage";
import objection from 'objection'

export { default as middleware } from './middleware'
export { ShardedModel, ShardedQueryBuilder } from './sharded-model'
export { default as Shard } from './models/shard'
export { default as ShardService } from './services/shard-service'
export { default as MigrationService } from './services/migration-service'

export function enableSharding (knex) {
  als.enable()
  const { Model } = objection
  Model.knex(knex)
}
