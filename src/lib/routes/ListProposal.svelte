<script>
  import {link} from 'svelte-routing'
  import Grid from 'gridjs-svelte'
  import {html} from 'gridjs'
  import Select from 'svelte-select';
  import {proposals} from '@/lib/store/proposals.js';
  import {proposalStatusLabels} from '@/lib/store/proposalStatusLabels.js';

  const votingSystemOpts = [
    {value: 'basic', label: 'Basic'}
  ]

  const columns = [
    {name: 'Name'},
    {name: 'Voting Platform/Method', formatter: (cell) => html(`${cell}`)},
    {name: 'Status', formatter: (cell) => html(`${cell}`)}
  ]

  $: data = $proposals.data.map(proposal => [
    html(`<a href="/proposal/update/${proposal.uuid}" use:link title="${proposal.title}">${proposal.title}</a>`),
    `${proposal.voting_platform}/${proposal.voting_method}`,
    $proposalStatusLabels[proposal.status]
  ])

  const isGovMember = true;
</script>

<h2>Proposals</h2>
<div class="records">
  <Grid {data} {columns} />
  <!--{#each $proposals.data as proposal}
  <div class="record">
    <a href="#" use:link title="{proposal.title}">{proposal.title}</a> 
    for, against, abstrain voting... forum poll or snapshot.
  </div>
  {/each}-->
</div>

<style>

</style>