<script>
  import {teamMembers} from '@/lib/store/teamMembers.js';
  import { getNotificationsContext } from 'svelte-notifications';

  const { addNotification } = getNotificationsContext();

  let role = null, member = null;

  function addItem() {
    if (!role.value || !member.value) {
      return addNotification({
        text: 'Role or Member can not be empty.',
        position: 'top-center',
        type: 'danger',
        removeAfter: 4000
      })
    }

    teamMembers.add({
      role: role.value,
      member: member.value
    })

    role.value = ''
    member.value = ''
  }

  function removeItem(i) {
    teamMembers.remove(i)
  }
</script>

<h3 style="margin-top:32px;margin-bottom:0px;">Team Members</h3>
<p style="margin-top:8px">List your team members and their roles for the upcoming season.</p>

{#each $teamMembers as rec, i}
  <div class="record">
    <div data-style="input-block">
      <label for="{'member_' + i}">Member</label>
      <input type="text" name="{'member_' + i}" bind:value="{$teamMembers[i].member}" />
    </div>
    <div data-style="input-block">
      <label for="{'role_' + i}">Role</label>
      <textarea name="{'role_' + i}" id="{'role_' + i}">{$teamMembers[i].role}</textarea>
    </div>
    <div data-style="input-block">
      <a on:click|preventDefault="{() => removeItem(i)}" href="#" data-style="btn-stroke-red" title="remove">remove</a>
    </div>
  </div>
{/each}

<div class="record">
  <div data-style="input-block">
    <label for="member">Member</label>
    <input type="text" name="member" bind:this="{member}" />
  </div>
  <div data-style="input-block">
    <label for="role">Role</label>
    <textarea name="role" id="role" bind:this="{role}"></textarea>
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