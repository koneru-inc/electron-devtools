<script>
    import { link } from 'svelte-spa-router'

    const navItems = ['Console', 'Network', 'Api', 'Rpc']
</script>

{#each navItems as item}
    <a href="/{item}" use:link>{item}</a>
{/each}