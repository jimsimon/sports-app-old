import als from "async-local-storage"
import objection from 'objection'

const { Model, QueryBuilder } = objection

export class ShardedQueryBuilder extends QueryBuilder {
  constructor(modelClass) {
    super(modelClass)
    this.context({
      onBuild: builder => {
        builder.withSchema(modelClass.schema)
      }
    })
  }
}

export class ShardedModel extends Model {
  static get schema () {
    return als.get('shard')
  }

  static get QueryBuilder() {
    return ShardedQueryBuilder
  }
}
