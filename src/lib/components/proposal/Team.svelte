<script>
  import {onMount} from 'svelte';
  import Select from 'svelte-select';
  import {teams} from '@/lib/store/teams.js';
  import {selectedTeam} from '@/lib/store/selectedTeam.js';
  import Loading from "@/lib/components/Loading.svelte";
  
  export let store = null;

  $: teamOptions = $teams.data.map(o => {
    return {value: o.id, label: o.title}
  }).concat([{value: 'other', label: 'Other'}])

  function handleSelect(e) {
    selectedTeam.set(e.detail.value)

    if ($selectedTeam == 'other') {
      setTimeout(function() {
        document.querySelector('input[name="other_team"]').focus();
      }, 300)
    }
  }
</script>

{#if $teams.fetching}
  <Loading />
{:else if $teams.error}
  <p>{$teams.error.message}</p>
{:else}
  <div data-style="input-block">
    <label for="team">Team</label>
    <Select items={teamOptions} id="team" on:select={handleSelect} placeholder="Choose."></Select>
  </div>

  {#if $selectedTeam == "other"}
    <div data-style="input-block">
      <label for="other_team">Enter team name</label>
      <input type="text" name="other_team">
    </div>
  {/if}
{/if}
