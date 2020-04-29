import { LitElement, html, customElement } from 'lit-element'

@customElement('sports-app')
export class RootApp extends LitElement {
  render () {
    return html`Sports Management App Loaded!<slot></slot>`
  }
}
