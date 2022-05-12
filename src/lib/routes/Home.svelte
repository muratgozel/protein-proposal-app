<script>
  import metapatcher from 'metapatcher';
  import {link} from 'svelte-routing'
  import {_} from 'svelte-i18n'
  import {viewport} from '@/lib/store/viewport'

  metapatcher.setPageMeta({
    title: 'Protein Proposal App'
  })
</script>

<div class="body">
  <div class="links">
    <a href="/proposal/create/seasonal-budget-request" use:link title="Create A Seasonal Budget Request Proposal">Create A Seasonal Budget Request Proposal</a>
  </div>
</div>

<style>
  .body {
    width: 1024px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .links a {
    color: black;
    text-decoration: underline;
  }
</style>