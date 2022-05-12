<script>
  import metapatcher from 'metapatcher';
  import {Router, Link, Route} from 'svelte-routing';
  import Notifications from 'svelte-notifications';
  import Header from "./lib/components/Header.svelte";
  import Loading from "./lib/components/Loading.svelte";
  import Home from './lib/routes/Home.svelte';
  import Footer from './lib/components/Footer.svelte';
  import SeasonalBudgetRequest from './lib/routes/SeasonalBudgetRequest.svelte';
  import {auth} from './lib/store/auth.js';

  const authentication = auth.authenticate()

  metapatcher.robots('noindex')

  export let url = '';
</script>

<Notifications>
{#await authentication}
  <Header />
  <Loading />
{:then authobj}
  <Header />

    <Router url={url} basepath="/">
      <Route path="/"><Home /></Route>
      <Route path="/proposal/create/seasonal-budget-request"><SeasonalBudgetRequest /></Route>
    </Router>
    
  <Footer />  
{:catch error}
  <Header />
  <p>{error.message}</p>
{/await}
</Notifications>

<style>
</style>
