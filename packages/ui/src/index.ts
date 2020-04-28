import './hmr.ts'
import './components/index.ts'

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept()
}
