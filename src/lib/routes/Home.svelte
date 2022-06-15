<script>
  import metapatcher from 'metapatcher';
  import {link} from 'svelte-routing'
  import {_} from 'svelte-i18n'
  import Loading from "@/lib/components/Loading.svelte";
  import {viewport} from '@/lib/store/viewport'
  import {auth} from '@/lib/store/auth.js';
  import {toolbox} from '@/lib/store/toolbox.js';
  import {proposals} from '@/lib/store/proposals.js';

  metapatcher.setPageMeta({
    title: 'Protein Governance'
  })

  auth.subscribe(state => {
    if (state.fetching === false && state.data) {
      proposals.refetch()
    }
  })
</script>

<h2>Welcome to Protein Governance Platform</h2>

<div class="sections">
  <div class="section">
    <h3>Latest Proposals</h3>
    {#if $proposals.fetching === true}
      <Loading />
    {:else if $proposals.error}
      <p></p>
    {:else}
      {#if $proposals.data.length === 0}
        <p>There is no proposals yet.</p>
      {:else}
        {#each $proposals.data as proposal}
          <a href="#" title="{proposal.title}">{proposal.title}</a><br>
        {/each}
      {/if}
    {/if}
  </div>
  <div class="section">
    <h3>Craft A Proposal</h3>
      {#each $toolbox.data as toolboxitem}
        <a href="/proposal/craft/{toolboxitem.slug}" use:link title="Create {toolboxitem.title} Proposal">{toolboxitem.title}</a><br>
      {/each}
  </div>  
</div>

<style>
  .sections {
    display: flex;
    justify-content: space-between;
  }
  .section {
    flex-basis: 40%;
    flex-grow: 1;
  }
  .section a {
    line-height: 1.6;
  }
  .links a {
    color: black;
    text-decoration: underline;
  }
</style>