import { MigrationService, ShardService } from 'sharding'
import createKnex from "../database/knex";
import configs from '../knexfile'

export default class ProvisionController {
  static async index (req, res) {
    try {
      const migrationService = new MigrationService(createKnex, configs)
      const shardService = new ShardService(migrationService)

      const activeShard = shardService.activeShard
      console.log(`Provisioning shard: ${activeShard}`)
      if (!await shardService.exists(activeShard)) {
        await shardService.create(activeShard)
        return res.send('Provisioning completed successfully!')
      }
      return res.send('This subdomain has already been provisioned.')
    } catch (e) {
      console.log(e)
      res.status(500).send(e.message)
    }
  }
}
