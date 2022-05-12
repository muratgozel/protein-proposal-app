import './lib/style/normalize.css'
import './lib/style/global.css'
import { regionist } from 'regionist'
import { register, init, locale } from 'svelte-i18n'
import { enableES5 } from 'immer'
import App from './App.svelte'

enableES5()

const region = regionist.guess()
register('en', () => import('./translations/en.json'))
locale.set(region.locale.replace('_', '-').toLowerCase())
init({
  fallbackLocale: 'en',
  initialLocale: region.locale.replace('_', '-').toLowerCase()
})

const app = new App({
  target: document.getElementById('app'),
  hydrate: import.meta.env.VITE_NODE_ENV == 'development' ? false : true,
  props: {}
})

export default app
