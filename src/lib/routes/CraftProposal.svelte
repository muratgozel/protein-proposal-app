<script>
  import {link} from 'svelte-routing'
  import {toolbox} from '@/lib/store/toolbox.js';
</script>

<h2>Craft A Proposal</h2>
<div class="links">
  {#each $toolbox.data as toolboxitem}
    <a href="/proposal/craft/{toolboxitem.slug}" use:link title="Create {toolboxitem.title} Proposal">{toolboxitem.title}</a><br>
  {/each}
</div>
