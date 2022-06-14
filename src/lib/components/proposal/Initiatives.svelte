<script>
  import {onMount} from 'svelte';
  import Quill from 'quill';
  import {initiatives} from '@/lib/store/initiatives.js';
  import { getNotificationsContext } from 'svelte-notifications';

  const { addNotification } = getNotificationsContext();

  let description=null, amount=null, name=null, effort=null;

  function addItem() {
    const descriptionDelta = description.getContents()
    if (descriptionDelta.ops[0].insert.length < 2 || !effort.value || !name.value) {
      return addNotification({
        text: 'Description, Name or Effort can not be empty.',
        position: 'top-center',
        type: 'danger',
        removeAfter: 4000
      })
    }

    initiatives.add({
      description: descriptionDelta,
      name: name.value,
      effort: effort.value
    })

    description.setContents([])
    effort.value = ''
    name.value = ''
  }

  function removeItem(i) {
    initiatives.remove(i)
  }

  onMount(async () => {
    // @ts-ignore
    description = new Quill('#description', {
      theme: 'bubble',
      placeholder: 'Please explain how this initiative will help community for its objectives.'
    })

    let restoredItems = false;
    initiatives.subscribe(state => {
      if (state.length === 0) {
        restoredItems = true;
        return;
      }

      if (restoredItems === false) {
        restoredItems = true;

        state.map((obj, i) => {
          const selector = '#description_' + i
          // @ts-ignore
          const c = new Quill(selector, {
            theme: 'bubble',
            placeholder: 'Please explain how this initiative will help community for its objectives.'
          })
          c.setContents(obj.description)
        })
      }
      else {
        // give some time for #description + i to be patched into the dom
        setTimeout(() => {
          const i = state.length - 1
          const obj = state[i]
          const selector = '#description_' + i
          // @ts-ignore
          const c = new Quill(selector, {
            theme: 'bubble',
            placeholder: 'Please explain how this initiative will help community for its objectives.'
          })
          c.setContents(obj.description)
        }, 300)
      }
    })

    return;
  })
</script>

<h3 style="margin-top:32px;margin-bottom:0px;">Initiatives</h3>
<p style="margin-top:8px">Classify your expenses, how much you are planning to spend on what.</p>

{#each $initiatives as rec, i}
  <div class="record">
    <div data-style="input-block">
      <label for="{'name_' + i}">Name</label>
      <input type="text" name="{'name_' + i}" bind:value="{$initiatives[i].name}" />
    </div>
    <div data-style="input-block">
      <label for="{'description_' + i}"><span class="number-badge">{i+1}</span> Description</label>
      <div id="{'description_' + i}" data-style="textarea"></div>
    </div>
    <div data-style="input-block">
      <label for="{'effort_' + i}">Effort</label>
      <input type="text" name="{'effort_' + i}" bind:value="{$initiatives[i].effort}" />
    </div>
    <div data-style="input-block">
      <a on:click|preventDefault="{() => removeItem(i)}" href="#" data-style="btn-stroke-red" title="remove">remove</a>
    </div>
  </div>
{/each}

<h3 class="create-title">Register an initiative</h3>
<div class="record">
  <div data-style="input-block">
    <label for="name">Name</label>
    <input type="text" name="name" bind:this="{name}" />
  </div>
  <div data-style="input-block">
    <label for="description">Description</label>
    <div id="description" data-style="textarea"></div>
  </div>
  <div data-style="input-block">
    <label for="effort">Effort</label>
    <input type="text" name="effort" bind:this="{effort}" placeholder="How much hours it requires, roughly, throughout the season." />
  </div>
  <div data-style="input-block">
    <a on:click|preventDefault="{addItem}" href="#" data-style="btn-stroke-green" title="add more">save</a>
  </div>
</div>

<style>
  .record {
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
  }
  .number-badge {
    font-weight: bold;
    padding: 2px 6px;
    background-color: #ADCF83;
    color: white;
    border-radius: 4px;
  }
  .create-title {
    color: #ADCF83;
    font-weight:400;
    margin-top:0;
  }
</style>