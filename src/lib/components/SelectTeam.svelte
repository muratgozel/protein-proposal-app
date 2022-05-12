<script>
  import Select from 'svelte-select';

  let team = null
  let teams = [
    {value: 'membership', label: 'Membership'},
    {value: 'recelerator', label: 'Recelerator'},
    {value: 'governance', label: 'Governance'},
    {value: 'goodgrowth', label: 'Good Growth'},
    {value: 'design', label: 'Design'},
    {value: 'research', label: 'Research'},
    {value: 'other', label: 'Other'}
  ];

  function handleSelect(e) {
    team = e.detail.value

    if (team == 'other') {
      setTimeout(function() {
        document.querySelector('input[name="other_team"]').focus();
      }, 300)
    }
  }
</script>

<div data-style="input-block">
  <label for="team">Team</label>
  <Select items={teams} id="team" on:select={handleSelect} placeholder="Choose."></Select>
</div>

{#if team == "other"}
  <div data-style="input-block">
    <label for="other_team">Enter team name</label>
    <input type="text" name="other_team">
  </div>
{/if}
