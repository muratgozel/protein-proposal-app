<script>
  import metapatcher from 'metapatcher';
  import {Router, Link, Route} from 'svelte-routing';
  import Notifications from 'svelte-notifications';
  import Header from "@/lib/components/Header.svelte";
  import Loading from "@/lib/components/Loading.svelte";
  import Home from '@/lib/routes/Home.svelte';
  import Footer from '@/lib/components/Footer.svelte';
  import CraftProposal from '@/lib/routes/CraftProposal.svelte';
  import ListProposal from '@/lib/routes/ListProposal.svelte';
  import SigninWithDiscourse from '@/lib/components/SigninWithDiscourse.svelte';
  import * as proposalRoutes from '@/lib/routes/proposal/index.js';
  import {auth} from '@/lib/store/auth.js';
  import {toolbox} from '@/lib/store/toolbox.js';

  metapatcher.robots('noindex')

  export let url = '';
</script>

<Notifications>

{#if $toolbox.fetching}
  <Header />
  <Loading />
{:else if $toolbox.error}
  <Header />
  <p>{$toolbox.error.message}</p>
{:else}
  <Header />
  <div class="body">

  {#if $toolbox.fetching}
    <Loading />
  {:else if $toolbox.error}
    <p>{$toolbox.error.message}</p>
  {:else}
    {#if $auth.data.method.name == "discourse"}
      <Router url={url} basepath="/">
        <Route path="/"><Home /></Route>
        <Route path="/proposal/craft"><CraftProposal /></Route>
        <Route path="/proposal/list"><ListProposal /></Route>
        {#each $toolbox.data as toolboxitem}
          <Route path="/proposal/craft/{toolboxitem.slug}"><svelte:component this="{proposalRoutes[toolboxitem.svelteComponent]}" name={toolboxitem.svelteComponent} /></Route>
        {/each}
      </Router>
    {:else}
      <SigninWithDiscourse />
    {/if}
  {/if}

  </div>
  <Footer />
{/if}

</Notifications>

<style>
  .body {
    width: 1024px;
    margin: 0 auto;
    padding: 0 24px;
  }
  @media (max-width: 1124px) {
    .body {
      width: auto;
      margin: unset;
      padding: 0 24px;
    }
  }
</style>
