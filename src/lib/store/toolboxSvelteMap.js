import { readable } from "svelte/store";

const initialState = {
  'Summary': 'Summary',
  'Team': 'Team',
  'Requested Amount Of $PRTN': 'RequestedAmountOfPrtn',
  'Requested Amount Of $USDC': 'RequestedAmountOfUsdc',
  'Good Growth Alignment': 'GoodGrowthAlignment',
  'Initiatives': 'Initiatives',
  'Team Members': 'TeamMembers',
  'Team Background': 'TeamBackground',
  'Focus': 'Focus'
}

export const toolboxSvelteMap = readable(initialState, set => {
  set(initialState)

  return () => {}
})