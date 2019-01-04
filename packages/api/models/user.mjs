import { ShardedModel } from 'sharding'

export default class User extends ShardedModel {

  static get schema () {
    return 'public'
  }

}
