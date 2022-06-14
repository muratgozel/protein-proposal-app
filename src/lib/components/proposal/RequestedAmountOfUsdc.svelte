<script>
  import { writable } from 'svelte/store';

  export let store = null;

  const value = writable('');
  value.subscribe(state => {
    $store.RequestedAmountOfUsdc = $value
  })
</script>

<div data-style="input-block">
  <label for="amount_usdc">Requested Amount Of $USDC</label>
  <input type="text" name="amount_usdc" bind:value="{$value}" />
</div>
