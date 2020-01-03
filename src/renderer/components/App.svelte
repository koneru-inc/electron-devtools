<script>
    import Router from 'svelte-spa-router'
    import {location} from 'svelte-spa-router'
    import Header from './Header/Header'
    import routes from '../router/routes'
    console.log("TCL: routes", routes)

</script>

<style lang="scss">
</style>

<Header />

<p>Вы находитесь на {$location}</p>

<Router {routes}/>