<script>
    import { link } from 'svelte-spa-router';
    import active from 'svelte-spa-router/active';

    const navItems = ['Console', 'Network', 'Api', 'Rpc'];
</script>

<style lang="scss">
    .nav {
        margin: 0;
        padding: 0;
        display: flex;
        list-style: none;
        line-height: 1;

        li {
            &:not(:last-child) {
                margin-right: 10px;
            }
        }

        a {
            text-decoration: none;
            :global(&.active) {
                color: red;
            }
        }
    }
</style>

<ul class="nav">
    {#each navItems as item}
        <li>
            <a href="/{item}" use:link use:active>{item}</a>
        </li>
    {/each}
</ul>
