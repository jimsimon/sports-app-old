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

  static async create (name) {
    const [_, shard] = await Promise.all([
      this.knex().schema.raw("CREATE SCHEMA ??", [name]),
      Shard.query().insert({
        name
      })
    ])
    return shard
  }

  static async run (name, cb) {
    try {
      await this.activate(name)
      await cb()
    } catch (e) {
      throw e
    }
  }

  async run (cb) {
    await Shard.run(this.name, cb)
  }

  static async activate (name) {
    als.set('shard', name, true)
  }

  async activate () {
    return Shard.activate(this.name)
  }
}
