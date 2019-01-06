import als from 'async-local-storage'
import { Shard } from '../index'

export default class ProvisionController {
  static async index (req, res) {
    try {
      const name = als.get('shard')
      console.log(`controller: ${name}`)
      const shards = await Shard.query().where('name', name)
      if (!shards.length) {
        console.log('Creating shard')
        await Shard.create(name)
        return res.send('Provisioning completed successfully!')
      }
      return res.send('This subdomain has already been provisioned.')
    } catch (e) {
      console.log(e)
      res.status(500).send(e.message)
    }
  }
}
