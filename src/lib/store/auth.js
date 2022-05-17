import { writable } from "svelte/store";
import produce from "immer";
import store from 'store/dist/store.modern'
import { sortBy } from "underscore";

const getUrlSearchParam = (name, url=window.location.href) => {
  name = name.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url)
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

const createAuthStore = () => {
  const initialState = {
    method: {},
    user: {}
  }
  const {subscribe, update, set} = writable(initialState)

  const authenticate = async () => {
    const newToken = getUrlSearchParam('token')
    const storedToken = store.get('token')
    const token = newToken || storedToken
    const resp = await fetch(import.meta.env.VITE_BACKEND_URL + '/session', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    if (resp.status < 200 || resp.status > 299) {
      return initialState
    }
    try {
      const json = await resp.json()
      if (json.revoked) {
        set(initialState)
        store.remove('token')
        return initialState
      }

      store.set('token', token)
      set(json)
      return json  
    } catch (error) {
      return initialState
    }

    return initialState
  }

  return {
    subscribe,
    authenticate,
    set
  }
}

export const auth = createAuthStore()