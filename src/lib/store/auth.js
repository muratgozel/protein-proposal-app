import { writable } from "svelte/store";
import produce from "immer";
import store from 'store/dist/store.modern'
import { sortBy } from "underscore";

const createAuthStore = () => {
  const initialState = {}
  const { subscribe, update, set } = writable(initialState)

  const authenticate = async () => {
    return {}
  }

  return {
    subscribe,
    authenticate,
    set
  }
}

export const auth = createAuthStore()