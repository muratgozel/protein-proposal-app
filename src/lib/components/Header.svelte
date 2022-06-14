<script>
  import {link} from 'svelte-routing'
  import {viewport} from '@/lib/store/viewport'
  import {auth} from '@/lib/store/auth.js';
</script>

<div class="header">
  <div class="logo">
    <a href="/" use:link title="Home">Protein Governance</a>
  </div>
  <div class="menu">
    <a href="/proposal/craft" use:link title="Craft A Proposal">Craft A Proposal</a>
    <a href="/proposal/list" use:link title="Proposals">Proposals</a>
  </div>
  <div class="user">
    {#if $auth.data.method.name == "discourse"}
      <span>Welcome</span><br><strong>{$auth.data.method.additional_params.username}</strong>
    {/if}
  </div>
</div>

<style>
  .header {
    width: 1024px;
    height: 92px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header .logo a {
    font-size: 24px;
    color: black;
    text-decoration: none;
  }

  .user span {
    font-size: 12px;
  }

  .menu a {
    color: black;
    padding: 0 12px;
  }

  @media (max-width: 1124px) {
    .header {
      width: auto;
      margin: unset;
      padding: 0 24px;
    }
  }
</style>