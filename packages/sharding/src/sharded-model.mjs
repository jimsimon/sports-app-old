import als from "async-local-storage"
import objection from 'objection'

const { Model, QueryBuilder } = objection

export class ShardedQueryBuilder extends QueryBuilder {
  constructor(modelClass) {
    super(modelClass)
    this.context({
      onBuild: builder => {
        builder.withSchema(this.constructor.shard)
      }
    })
  }

  static get shard () {
    return als.get('shard')
  }
}

export class ShardedModel extends Model {
  static get QueryBuilder() {
    return ShardedQueryBuilder
  }
}
