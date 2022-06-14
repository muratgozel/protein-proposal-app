<script>
  import { writable } from 'svelte/store';

  export let store = null;

  const value = writable('');
  value.subscribe(state => {
    $store.RequestedAmountOfPrtn = $value
  })
</script>

<div data-style="input-block">
  <label for="amount_prtn">Requested Amount Of $PRTN</label>
  <input type="text" name="amount_prtn" bind:value="{$value}" />
</div>
