import als from "async-local-storage";
import objection from 'objection'

const { Model } = objection

export default class Shard extends Model {
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
    Shard.activate(this.name)
  }
}
