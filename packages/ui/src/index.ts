import {render, html} from 'lit-html'
import './hmr'
import './components/index'
import router from './router/index'
// import store from './store/index'
// import './components/store-provider/connected'
import { TemplateResult } from 'lit-element'

router.on('route', async (args: any, routing: Promise<TemplateResult>) => {
  // Object.assign(args.context, { store })
  const view = await routing
  if (view) {
    render(html`
        <sports-app>
          ${view}
        </sports-app>`,
    document.body)
  }
}).start()


// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept()
}
