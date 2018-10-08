import als from "async-local-storage";

als.enable()

export default function middleware (req, res, next) {
  // TODO: Figure out if this is the most efficient async context we can create
  setTimeout(() => {
    als.scope()
    als.set('shard', req.subdomains.join('.'))
    next()
  }, 0)
}
