import als from "async-local-storage";
import objection from 'objection'

export { default as middleware } from './middleware'
export { ShardedModel, ShardedQueryBuilder } from './sharded-model'
export { default as Shard } from './models/shard'
export { default as ProvisionController } from './controllers/provision-controller'

export function enableSharding (knex) {
  als.enable()
  const { Model } = objection
  Model.knex(knex)
}
