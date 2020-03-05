<script>
    import { ipcRenderer } from 'electron';
    import { onMount } from 'svelte';

    let logsArr = [];
    console.log('logsArr', logsArr);

    ipcRenderer.on('@ELECTRON_DEVTOOLS/CONSOLE', (event, args, key) => {
        logsArr.push({
            value: args,
            type: key,
            payload: args.slice(1),
        });

        logsArr = logsArr;
    });
</script>

<p>Console</p>
<ul>
    {#each logsArr as logItem}
        <li>{logItem.type} {logItem.value}</li>
    {/each}
</ul>
