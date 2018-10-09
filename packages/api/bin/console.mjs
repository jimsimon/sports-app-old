import repl from 'repl'
import path from 'path'
import fs from 'fs'
import pkg from '../package.json'
import { enableSharding, Shard } from 'sharding'
import createKnex from "../database/knex"
import config from "../knexfile"

const knex = createKnex(config)

enableSharding(knex)

const modelsDir = path.resolve('./models')
fs.readdir(modelsDir, async (err, files) => {
  const promises = files.map((file) => {
    console.log(file)
    return import(`${modelsDir}/${file}`)
  })

  const classes = await Promise.all(promises)
  console.log(classes.length)
  const models = classes.reduce((models, modelModule) => {
    const modelClass = modelModule.default
    console.log(modelClass.name)
    models[modelClass.name] = modelClass
    return models
  }, {})

  console.log(models)

  const replServer = repl.start({
    prompt: `${pkg.name}> `
  })
  Object.assign(replServer.context, models, {
    "Shard": Shard
  })
})

