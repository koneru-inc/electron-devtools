<script>
    import Router from 'svelte-spa-router';
    import { location } from 'svelte-spa-router';
    import routes from '../../router/routes';
</script>

<main class="main">
    <p>Вы находитесь на {$location}</p>
    <Router {routes} />
</main>
