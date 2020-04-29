import { LitElement, html, customElement } from 'lit-element'

@customElement('admin-dashboard')
class AdminDashboard extends LitElement {
  render () {
    return html`Admin Dashboard<a href="/banana">Banana</a>`
  }
}
