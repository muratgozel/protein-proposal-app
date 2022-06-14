<script>
  import {onMount} from 'svelte';
  import Quill from 'quill';

  export let store = null;

  onMount(async () => {
    const focus = new Quill('#focus', {
      theme: 'bubble',
      placeholder: 'Please explain what this team will be focusing on this season.'
    })

    focus.on('text-change', function(delta, oldDelta, source) {
      $store.Focus = focus.getContents()
    })

    return;
  })
</script>

<div data-style="input-block">
  <label for="focus">Focus</label>
  <div id="focus" data-style="textarea"></div>
</div>
