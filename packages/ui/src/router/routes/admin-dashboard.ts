import Router from 'middle-router'
import { TemplateResult, html } from 'lit-element'

interface RouteParams {
  resolve: (result: TemplateResult) => void
}

export default Router()
  .use(({resolve} : RouteParams) => {
    resolve(html`<admin-dashboard></admin-dashboard>`)
  })
