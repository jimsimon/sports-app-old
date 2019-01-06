import knex from 'knex'

const environment = process.env.NODE_ENV || 'development'

export default function createKnex (configs, searchPath = undefined) {
  const config = configs[environment]
  config['searchPath'] = searchPath

  return knex(config)
}
