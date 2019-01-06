import als from 'async-local-storage'
import { Shard } from '../index'

export default class ShardService {
  constructor (migrationService) {
    this.migrationService = migrationService
  }

  async create (name) {
    if (!await this.exists(name)) {
      console.log(`Creating shard: ${name}`)
      const shard = await Shard.create(name)
      await this.migrationService.migrateSchemaToLatest(shard)
    }
  }

  async exists (name) {
    const shards = await Shard.query().where('name', name)
    return shards.length > 0
  }

  get activeShard () {
    return als.get('shard')
  }
}
