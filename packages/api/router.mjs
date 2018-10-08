import express from 'express'
import { ProvisionController } from 'sharding'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.get('/provision', ProvisionController.index)

export default router
