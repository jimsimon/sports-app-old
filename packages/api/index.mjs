import express from 'express'
import router from './router'
import createKnex from './database/knex'
import configs from './knexfile'
import { enableSharding, middleware } from 'sharding'

function main () {
  const knex = createKnex(configs)

  enableSharding(knex)

  const app = express()

  app.use(middleware)
  app.use(router)

  app.listen(3000, () => {
    console.log('API is running!')
  })
}

main()
