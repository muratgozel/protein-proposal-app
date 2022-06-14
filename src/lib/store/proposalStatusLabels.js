import { readable } from "svelte/store";

const initialState = {
  'SUBMITTED': 'Pending validation',
  'VALIDATED': 'Scheduled for discussion'
}

export const proposalStatusLabels = readable(initialState, set => {
  set(initialState)

  return () => {}
})