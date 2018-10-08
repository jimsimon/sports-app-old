import objection from 'objection'

const { Model } = objection

export default class Shard extends Model {
  static get tableName () {
    return 'shards'
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString()
    this.updatedAt = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString()
  }
}
