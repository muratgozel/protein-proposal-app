<script>
  import {prevSeasonRecap} from '@/lib/store/prevSeasonRecap.js';
  import { getNotificationsContext } from 'svelte-notifications';

  const { addNotification } = getNotificationsContext();

  let objective = null, outcome = null;

  function addItem() {
    if (!objective.value || !outcome.value) {
      return addNotification({
        text: 'Objective or Outcome can not be empty.',
        position: 'top-center',
        type: 'danger',
        removeAfter: 4000
      })
    }

    prevSeasonRecap.add({
      objective: objective.value,
      outcome: outcome.value
    })

    objective.value = ''
    outcome.value = ''
  }

  function removeItem(i) {
    prevSeasonRecap.remove(i)
  }
</script>

<h3 style="margin-top:32px;margin-bottom:0px;">Prev Season Recap</h3>
<p style="margin-top:8px">Summarize your OKRs for the previous season.</p>

{#each $prevSeasonRecap as rec, i}
  <div class="record">
    <div data-style="input-block">
      <label for="{'objective_' + i}">Objective</label>
      <textarea name="{'objective_' + i}" id="{'objective_' + i}">{$prevSeasonRecap[i].objective}</textarea>
    </div>
    <div data-style="input-block">
      <label for="{'outcome_' + i}">Outcome</label>
      <textarea name="{'outcome_' + i}" id="{'outcome_' + i}">{$prevSeasonRecap[i].outcome}</textarea>
    </div>
    <div data-style="input-block">
      <a on:click|preventDefault="{() => removeItem(i)}" href="#" data-style="btn-stroke-red" title="remove">remove</a>
    </div>
  </div>
{/each}

<div class="record">
  <div data-style="input-block">
    <label for="objective">Objective</label>
    <textarea name="objective" id="objective" bind:this="{objective}"></textarea>
  </div>
  <div data-style="input-block">
    <label for="outcome">Outcome</label>
    <textarea name="outcome" id="outcome" bind:this="{outcome}"></textarea>
  </div>
  <div data-style="input-block">
    <a on:click|preventDefault="{addItem}" href="#" data-style="btn-stroke-green" title="add more">more +</a>
  </div>
</div>

<style>
  .record {
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
  }
</style>