<script>
  import {onMount} from 'svelte';
  import Select from 'svelte-select';
  import {seasons} from '@/lib/store/seasons.js';
  import {selectedSeason} from '@/lib/store/selectedSeason.js';
  import Loading from "@/lib/components/Loading.svelte";

  export let store = null;

  $: options = $seasons.data.list.map((o, i) => {
    return {value: o.id, label: o.title}
  })

  selectedSeason.set($seasons.data.nextSeason.id)

  function handleSelect(e) {
    selectedSeason.set(e.detail.value)
  }
</script>

{#if $seasons.fetching}
  <Loading />
{:else if $seasons.error}
  <p>{$seasons.error.message}</p>
{:else}
  <div data-style="input-block">
    <label for="season">Season</label>
    <Select items={options} value="{$seasons.data.nextSeason.title}" id="season" on:select={handleSelect} placeholder="Choose."></Select>
  </div>
{/if}
