import { Shard } from "./index";

export default async function middleware (req, res, next) {
  const name = req.subdomains.join('.')
  Shard.activate(name)
  next()
}
