import {writable} from "svelte/store";
import store from 'store/dist/store.modern';

const fetchSeasons = async () => {
  const token = store.get('token')
  const resp = await fetch(import.meta.env.VITE_BACKEND_URL + '/notion/seasons-schedule', {
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

const createSeasonsStore = () => {
  const initialState = {data: {nextSeason: {id: ''}}, fetching: true}
  const {subscribe, update, set} = writable(initialState)

  set(initialState)

  fetchSeasons().then(obj => obj.error 
    ? set({error: obj, fetching: false}) 
    : set({data: obj, fetching: false})
  )

  return {
    subscribe,
    set
  }
}

export const seasons = createSeasonsStore()
