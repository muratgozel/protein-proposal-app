import {writable} from "svelte/store";
import store from 'store/dist/store.modern';

const fetchTeams = async () => {
  const token = store.get('token')
  const resp = await fetch(import.meta.env.VITE_BACKEND_URL + '/notion/teams', {
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

const createTeamsStore = () => {
  const initialState = {data: [], fetching: true}
  const {subscribe, update, set} = writable(initialState)

  set(initialState)

  fetchTeams().then(obj => obj.error 
    ? set({error: obj, fetching: false}) 
    : set({data: obj, fetching: false})
  )

  return {
    subscribe,
    set
  }
}

export const teams = createTeamsStore()