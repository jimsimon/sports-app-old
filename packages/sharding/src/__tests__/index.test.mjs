import { ShardedModel, middleware } from "../index"

import Knex from 'knex'

// Initialize knex.
const knex = Knex({
  client: 'pg',
  connection: {
    "user": "postgres",
    "password": null,
    "host": "localhost",
    "port": 5432,
    "database": "sportsapp"
  }
});

// Give the knex object to objection.
ShardedModel.knex(knex);

class Test extends ShardedModel {
  static get tableName() {
    return 'someTableName';
  }
}

middleware(null, null, async () => {
  await Test.query()
})
