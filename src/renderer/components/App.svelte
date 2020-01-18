<script>
    import Header from './Header/Header'
    import Main from './Main/Main.svelte';
    import Footer from './Footer/Footer';
    import { ipcRenderer } from 'electron';

    ipcRenderer.on('@ELECTRON_DEVTOOLS/CONSOLE/log', (event, ...args) => {
        console.log(...args);
    });
</script>

<style lang="scss">
</style>

<Header />

<Main />

<Footer />
