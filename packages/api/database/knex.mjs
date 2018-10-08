import knex from 'knex'

const environment = process.env.NODE_ENV || 'development'

export default function createKnex (configs) {
  const config = configs[environment]

  return knex(config)
}
