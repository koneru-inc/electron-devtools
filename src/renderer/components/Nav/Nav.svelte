<script>
    import { link } from 'svelte-spa-router';

    const navItems = ['Console', 'Network', 'Api', 'Rpc'];
</script>

<style lang="scss">
    .nav {
        margin: 0;
        padding: 0;

        a {
            text-decoration: none;
        }
    }
</style>

<ul class="nav">
    {#each navItems as item}
        <a href="/{item}" use:link>{item}</a>
    {/each}
</ul>
