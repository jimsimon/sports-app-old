import { Shard } from "./index";

export default async function middleware (req, res, next) {
  const name = req.subdomains.join('.')
  await Shard.activate(name)
  next()
  await Shard.deactivate()
}
