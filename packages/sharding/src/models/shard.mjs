import als from "async-local-storage"
import { ShardedModel } from '../sharded-model'

export default class Shard extends ShardedModel {
  static get schema () {
    return 'public'
  }

  static get tableName () {
    return 'shards'
  }

  $beforeInsert () {
    this.createdAt = new Date().toISOString()
    this.updatedAt = new Date().toISOString()
  }

  $beforeUpdate () {
    this.updatedAt = new Date().toISOString()
  }

  static async activate (name) {
    als.scope()
    als.set('shard', name)
  }

  async activate () {
    return Shard.activate(this.name)
  }

  static deactivate () {
    return Shard.deactivate()
  }

  deactivate () {
    return Shard.activate(null)
  }
}
