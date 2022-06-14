import {writable} from "svelte/store";
import store from 'store/dist/store.modern';

export const fetchProposals = async () => {
  const token = store.get('token')
  const resp = await fetch(import.meta.env.VITE_BACKEND_URL + '/proposal/list', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  if (resp.status < 200 || resp.status > 299) {
    return {error: new Error('Server responded with ' + resp.status)}
  }

  try {
    const json = await resp.json()
    return json
  } catch (error) {
    return {error}
  }
}

const createProposalsStore = () => {
  const initialState = {data: [], fetching: true}
  const {subscribe, update, set} = writable(initialState)

  set(initialState)

  fetchProposals().then(json => json.error 
    ? set({error: json, fetching: false}) 
    : set({data: json, fetching: false})
  )

  const refetch = () => {
    fetchProposals().then(json => json.error 
      ? set({error: json, fetching: false}) 
      : set({data: json, fetching: false})
    )  
  }

  return {
    subscribe,
    set,
    refetch
  }
}

export const proposals = createProposalsStore()