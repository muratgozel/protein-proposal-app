<script>
  import {onDestroy} from 'svelte';
  import { navigate } from "svelte-routing"
  import store from 'store/dist/store.modern';
  import { getNotificationsContext } from 'svelte-notifications';
  import * as proposalComponents from '@/lib/components/proposal/index.js';
  import Loading from "@/lib/components/Loading.svelte";
  import ChooseSeason from '@/lib/components/ChooseSeason.svelte';
  import {toolbox} from '@/lib/store/toolbox.js';
  import {toolboxSvelteMap} from '@/lib/store/toolboxSvelteMap.js';
  import {teams} from '@/lib/store/teams.js';
  import {teamMembers} from '@/lib/store/teamMembers.js';
  import {seasons} from '@/lib/store/seasons.js';
  import {selectedTeam} from '@/lib/store/selectedTeam.js';
  import {selectedSeason} from '@/lib/store/selectedSeason.js';
  import {seasonalBudgetRequestStore} from '@/lib/store/seasonalBudgetRequest.js';
  import {initiatives} from '@/lib/store/initiatives.js';
  import {proposals} from '@/lib/store/proposals.js';

  export let name;
/*
  seasonalBudgetRequestStore.set(Object.values($toolboxSvelteMap).reduce((memo, c) => {
    memo[c] = ''
    return memo
  }, {}))
*/
  const { addNotification } = getNotificationsContext();

  const fetchOkrs = async (season) => {
    const token = store.get('token')
    const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/notion/okrs/?season=${season}`, {
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

  let okrs = false;
  selectedSeason.subscribe(state => {
    if (state != '0') {
      okrs = true
      fetchOkrs(state).then(result => {
        okrs = result.okrs
      })
    }
  })

  $: toolboxitem = $toolbox.data.filter(o => o.svelteComponent == name)[0]
  $: teamtitle = $selectedTeam ? $teams.data.filter(t => t.id == $selectedTeam)[0].title : ''
  $: nextSeasonTitle = $selectedSeason ? $seasons.data.list.filter(s => s.id == $selectedSeason)[0].title : ''

  function submitProposal() {
    return;

    const isUuid = (v) => {
      const re = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
      return re.test(v)
    }

    if (!isUuid($selectedSeason)) {
      return addNotification({
        text: 'Please choose season.',
        position: 'top-center',
        type: 'danger',
        removeAfter: 4000
      })
    }

    if (!isUuid($selectedTeam)) {
      return addNotification({
        text: 'Please choose team.',
        position: 'top-center',
        type: 'danger',
        removeAfter: 4000
      })
    }

    if ($initiatives.length === 0) {
      return addNotification({
        text: 'Please clarify budget breakdown.',
        position: 'top-center',
        type: 'danger',
        removeAfter: 4000
      })
    }

    if ($teamMembers.length === 0) {
      return addNotification({
        text: 'Please add your team members for the season.',
        position: 'top-center',
        type: 'danger',
        removeAfter: 4000
      })
    }

    if ($seasonalBudgetRequestStore.GoodGrowthAlignment.ops[0].insert.length < 2) {
      return addNotification({
        text: 'Please fill out Good Growth Alignment of your proposal.',
        position: 'top-center',
        type: 'danger',
        removeAfter: 4000
      })
    }

    if ($seasonalBudgetRequestStore.Tldr.ops[0].insert.length < 2) {
      return addNotification({
        text: 'Please fill out TL;DR section.',
        position: 'top-center',
        type: 'danger',
        removeAfter: 4000
      })
    }

    if (!$seasonalBudgetRequestStore.RequestedAmountOfPrtn && !$seasonalBudgetRequestStore.RequestedAmountOfUsdc) {
      return addNotification({
        text: 'Please specify how much amont of $PRTN and/or $USDC you request.',
        position: 'top-center',
        type: 'danger',
        removeAfter: 4000
      })
    }

    $seasonalBudgetRequestStore.Season = $selectedSeason
    $seasonalBudgetRequestStore.Team = $selectedTeam
    $seasonalBudgetRequestStore.Initiatives = $initiatives
    $seasonalBudgetRequestStore.TeamMembers = $teamMembers
    $seasonalBudgetRequestStore.votingPlatform = toolboxitem.votingPlatform
    $seasonalBudgetRequestStore.votingMethod = toolboxitem.votingMethod

    const title = `${nextSeasonTitle} Budget Request - ${teamtitle}`

    const token = store.get('token')
    fetch(`${import.meta.env.VITE_BACKEND_URL}/proposal/submit`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        json: $seasonalBudgetRequestStore
      })
    })
    .then(resp => resp.json())
    .then(json => {
      if (json.error) {
        return addNotification({
          text: 'An error occured while processing your request. Error message: ' + json.error.message,
          position: 'top-center',
          type: 'danger',
          removeAfter: 4000
        })
      }

      addNotification({
        text: 'Proposal saved successfully.',
        position: 'top-center',
        type: 'success',
        removeAfter: 4000
      })

      proposals.refetch();

      navigate('/proposal/list');

      initiatives.flush()
      teamMembers.flush()
    })
    .catch(err => {
      return addNotification({
        text: 'An unexpected error occured while processing your request.',
        position: 'top-center',
        type: 'danger',
        removeAfter: 4000
      })
    })
  }
</script>

<h2>General Purpose Proposal</h2>
<p></p>

<div class="form">
  {#each toolboxitem.components.fixed as c}
    <svelte:component this="{proposalComponents[$toolboxSvelteMap[c]]}" store="{seasonalBudgetRequestStore}" />
  {/each}

  <a on:click|preventDefault="{submitProposal}" href="#" data-style="btn-blue" title="Submit">Submit</a>
</div>

<style>
  .form {
    display: flex;
    flex-direction: column;
    margin-top: 32px;
  }
  .form [data-style="btn-blue"] {
    text-align: center;
  }

  .okr-report {
    color: #5F84DD;
    border: 1px solid #5F84DD;
    border-radius: 4px;
    padding: 12px;
    line-height: 1.3;
  }

  .okr-report-content li {
    color: black;
    font-size: 14px;
  }

  @media (max-width: 1124px) {
    .body {
      width: auto;
      margin: unset;
      padding: 0 24px;
    }
  }
</style>