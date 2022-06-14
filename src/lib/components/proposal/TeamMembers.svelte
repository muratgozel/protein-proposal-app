<script>
  import {teamMembers} from '@/lib/store/teamMembers.js';
  import { getNotificationsContext } from 'svelte-notifications';

  const { addNotification } = getNotificationsContext();

  let role=null, member=null, hoursCommitted=null;

  function addItem() {
    if (!role.value || !member.value || !hoursCommitted.value) {
      return addNotification({
        text: 'Role, Committed hours or Member can not be empty.',
        position: 'top-center',
        type: 'danger',
        removeAfter: 4000
      })
    }

    teamMembers.add({
      role: role.value,
      member: member.value,
      hoursCommitted: hoursCommitted.value
    })

    role.value = ''
    member.value = ''
    hoursCommitted.value = ''
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
      <label for="{'member_' + i}"><span class="number-badge">{i+1}</span> Member</label>
      <input type="text" name="{'member_' + i}" bind:value="{$teamMembers[i].member}" />
    </div>
    <div data-style="input-block">
      <label for="{'role_' + i}">Role</label>
      <input type="text" name="{'role_' + i}" id="{'role_' + i}" bind:value="{$teamMembers[i].role}" />
    </div>
    <div data-style="input-block">
      <label for="{'hours_committed_' + i}">Hours committed</label>
      <input type="text" name="{'hours_committed_' + i}" bind:value="{$teamMembers[i].hoursCommitted}" />
    </div>
    <div data-style="input-block">
      <a on:click|preventDefault="{() => removeItem(i)}" href="#" data-style="btn-stroke-red" title="remove">remove</a>
    </div>
  </div>
{/each}

<h3 class="create-title">Register a team member</h3>
<div class="record">
  <div data-style="input-block">
    <label for="member">Member</label>
    <input type="text" name="member" bind:this="{member}" />
  </div>
  <div data-style="input-block">
    <label for="role">Role</label>
    <input type="text" name="role" bind:this="{role}" />
  </div>
  <div data-style="input-block">
    <label for="hours_committed">Hours committed</label>
    <input type="text" name="hours_committed" bind:this="{hoursCommitted}" />
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