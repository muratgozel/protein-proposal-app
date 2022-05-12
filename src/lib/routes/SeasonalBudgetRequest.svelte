<script>
  import SelectTeam from "../components/SelectTeam.svelte";
  import InputPrtnAmount from "../components/InputPRTNAmount.svelte";
  import InputUsdcAmount from "../components/InputUsdcAmount.svelte";
  import BudgetBreakdown from "../components/BudgetBreakdown.svelte";
  import PrevSeasonRecap from "../components/PrevSeasonRecap.svelte";
  import TeamMembers from "../components/TeamMembers.svelte";

  function submitProposal() {

  }
</script>

<div class="body">
  <h2>Request A Seasonal Budget</h2>
  <p>Plan, team up and request a budget for the upcoming season on Protein DAO.</p>
  <div class="form">
    <SelectTeam />
    <InputPrtnAmount />
    <InputUsdcAmount />
    <BudgetBreakdown />
    <PrevSeasonRecap />
    <TeamMembers />
    <a on:click|preventDefault="{submitProposal}" href="#" data-style="btn-blue" title="Submit">Submit</a>
  </div>
</div>

<style>
  .body {
    width: 1024px;
    margin: 0 auto;
  }
  .form {
    display: flex;
    flex-direction: column;
    margin-top: 32px;
  }
  .form [data-style="btn-blue"] {
    text-align: center;
  }
</style>