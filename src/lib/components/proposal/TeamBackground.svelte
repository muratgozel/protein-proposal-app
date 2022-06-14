<script>
  import {onMount} from 'svelte';
  import Quill from 'quill';

  export let store = null;

  onMount(async () => {
    const teambg = new Quill('#teambg', {
      theme: 'bubble',
      placeholder: 'Please summarize what this team were doing previously, if possible.'
    })

    teambg.on('text-change', function(delta, oldDelta, source) {
      $store.TeamBackground = teambg.getContents()
    })

    return;
  })
</script>

<div data-style="input-block">
  <label for="teambg">Team Background</label>
  <div id="teambg" data-style="textarea"></div>
</div>
