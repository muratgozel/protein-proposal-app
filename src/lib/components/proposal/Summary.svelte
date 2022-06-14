<script>
  import {onMount} from 'svelte';
  import Quill from 'quill';

  export let store = null;

  onMount(async () => {
    const summary = new Quill('#summary', {
      theme: 'bubble',
      placeholder: 'Please summarize this proposal in a couple of sentences.'
    })

    summary.on('text-change', function(delta, oldDelta, source) {
      $store.Summary = summary.getContents()
    })

    return;
  })
</script>

<div data-style="input-block">
  <label for="summary">Summary</label>
  <div id="summary" data-style="textarea"></div>
</div>
