import { writable } from "svelte/store";
import produce from "immer";
import store from 'store/dist/store.modern'
import { sortBy } from "underscore";

const restoreItems = () => {
  const items = store.get('budgetBreakdown')

  return Array.isArray(items) ? items : []
}

const createBudgetBreakdownStore = () => {
  const initialState = restoreItems()
  const { subscribe, update, set } = writable(initialState)

  const flush = () => {
    set([])
    store.set('budgetBreakdown', [])
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

export const budgetBreakdown = createBudgetBreakdownStore()

budgetBreakdown.subscribe(state => {
  store.set('budgetBreakdown', state)
})
