<script>
  import { writable } from 'svelte/store';

  export let store = null;

  const value = writable('');
  value.subscribe(state => {
    $store.Title = $value
  })
</script>

<div data-style="input-block">
  <label for="title">Title</label>
  <input type="text" name="title" bind:value="{$value}" />
</div>
