<script>
  import {link} from 'svelte-routing'
  import {_} from 'svelte-i18n'
</script>

<div class="footer">
  <div class="col">
    <div class="item">{$_('copyright', {default: 'Copyright © {year} {name}', values: {
      year: (new Date()).getFullYear(),
      name: $_('app.name')
    }})}</div>
  </div>
</div>

<style>
  .footer {
    width: 1024px;
    margin: 64px auto;
    display: flex;
    justify-content: space-between;
  }

  .col {
    display: inline-table;
  }

  .item {
    display: block;
    font-size: 12px;
    margin-bottom: 8px;
    text-decoration: none;
    color: #666;
  }

  @media (max-width: 1124px) {
    .footer {
      width: auto;
      padding: 0 24px;
    }
  }
</style>