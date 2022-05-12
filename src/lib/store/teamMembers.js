import { writable } from "svelte/store";
import produce from "immer";
import store from 'store/dist/store.modern'
import { sortBy } from "underscore";

const restoreItems = () => {
  const items = store.get('teamMembers')

  return Array.isArray(items) ? items : []
}

const createTeamMembersStore = () => {
  const initialState = restoreItems()
  const { subscribe, update, set } = writable(initialState)

  const flush = () => {
    set([])
    store.set('teamMembers', [])
  }

  const add = (payload) => {
    return update(state => {
      const nextState = produce(state, draftState => {
        draftState.push(payload)
      })
      return nextState
    })
  }

  const remove = (i) => {
    return update(state => {
      return produce(state, draftState => {
        draftState.splice(i, 1)
      })
    })
  }

  return {
    subscribe,
    flush,
    add,
    remove,
    set
  }
}

export const teamMembers = createTeamMembersStore()

teamMembers.subscribe(state => {
  store.set('teamMembers', state)
})
