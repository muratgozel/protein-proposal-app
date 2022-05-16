<script>
  import { getNotificationsContext } from 'svelte-notifications';

  const { addNotification } = getNotificationsContext();

  let disabled = ''
  let label = 'Sign in with Discourse'

  function onSigninWithDiscourse() {
    if (disabled.length > 0) return;

    disabled = 'disabled'
    label = 'Please wait...';

    fetch(import.meta.env.VITE_BACKEND_URL + '/discourse/signin')
      .then(resp => resp.json())
      .then(json => {
        const url = decodeURIComponent(json.redirect)
        window.location.href = url
        return;
      })
      .catch(err => {
        disabled = ''
        label = 'Sign in with Discourse'

        return addNotification({
          text: 'An unexpected error occured: ' + err.message,
          position: 'top-center',
          type: 'danger'
        })
      })
  }
</script>

<a on:click|preventDefault="{onSigninWithDiscourse}" href="#" data-style="btn-blue" title="{label}" {disabled}>{label}</a>
