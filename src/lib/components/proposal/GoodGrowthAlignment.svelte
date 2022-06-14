<script>
  import {onMount} from 'svelte';
  import Quill from 'quill';

  export let store = null;

  onMount(async () => {
    const ggthAlignment = new Quill('#ggth_alignment', {
      theme: 'bubble',
      placeholder: 'Please explain how this proposal align with GGth.'
    })

    ggthAlignment.on('text-change', function(delta, oldDelta, source) {
      $store.GoodGrowthAlignment = ggthAlignment.getContents()
    })

    return;
  })
</script>

<div data-style="input-block">
  <label for="ggth_alignment">Good Growth Alignment</label>
  <div id="ggth_alignment" data-style="textarea"></div>
</div>
