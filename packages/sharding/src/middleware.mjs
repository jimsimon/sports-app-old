import als from "async-local-storage"
import { Shard } from "./index";

export default async function middleware (req, res, next) {
  const name = req.subdomains.join('.')
  als.scope()
  await Shard.run(name, next)
}
