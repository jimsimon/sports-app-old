import express from 'express'
import router from './router'
import createKnex from './database/knex'
import config from './knexfile'
import objection from 'objection'
import { middleware } from 'sharding'

function main () {
  const knex = createKnex(config)

  const { Model } = objection
  Model.knex(knex)

  const app = express()

  app.use(middleware)
  app.use(router)

  app.listen(3000, () => {
    console.log('API is running!')
  })
}

main()
