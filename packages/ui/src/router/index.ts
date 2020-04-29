import Router from 'middle-router'

export default Router()
  .lazy('/admin-dashboard', async () => {
    return (await import(
      /* webpackChunkName: 'login' */
      './routes/admin-dashboard'
      )).default
  })
  .lazy(async () => {
    return (await import(
      /* webpackChunkName: 'watchlist' */
      './routes/page-not-found'
      )).default
  })
