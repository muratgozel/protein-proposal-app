<script>
  import {budgetBreakdown} from '@/lib/store/budgetBreakdown.js';
  import { getNotificationsContext } from 'svelte-notifications';

  const { addNotification } = getNotificationsContext();

  let category = null, amount = null;

  function addItem() {
    if (!category.value || !amount.value) {
      return addNotification({
        text: 'Category or Amount can not be empty.',
        position: 'top-center',
        type: 'danger',
        removeAfter: 4000
      })
    }

    budgetBreakdown.add({
      category: category.value,
      amount: amount.value
    })

    category.value = ''
    amount.value = ''
  }

  function removeItem(i) {
    budgetBreakdown.remove(i)
  }
</script>

<h3 style="margin-top:32px;margin-bottom:0px;">Budget Breakdown</h3>
<p style="margin-top:8px">Classify your expenses, how much you are planning to spend on what.</p>

{#each $budgetBreakdown as rec, i}
  <div class="record">
    <div data-style="input-block">
      <label for="{'category_' + i}">Category</label>
      <textarea name="{'category_' + i}" id="{'category_' + i}">{$budgetBreakdown[i].category}</textarea>
    </div>
    <div data-style="input-block">
      <label for="{'amount_' + i}">Amount</label>
      <input type="text" name="{'amount_' + i}" bind:value="{$budgetBreakdown[i].amount}" />
    </div>
    <div data-style="input-block">
      <a on:click|preventDefault="{() => removeItem(i)}" href="#" data-style="btn-stroke-red" title="remove">remove</a>
    </div>
  </div>
{/each}

<div class="record">
  <div data-style="input-block">
    <label for="category">Category</label>
    <textarea name="category" id="category" bind:this="{category}"></textarea>
  </div>
  <div data-style="input-block">
    <label for="amount">Amount</label>
    <input type="text" name="amount" bind:this="{amount}" />
  </div>
  <div data-style="input-block">
    <a on:click|preventDefault="{addItem}" href="#" data-style="btn-stroke-green" title="add more">more +</a>
  </div>
</div>

<style>
  .record {
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
  }
</style>