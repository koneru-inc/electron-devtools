<script>
    import Header from './Header/Header';
    import Main from './Main/Main.svelte';
    import Footer from './Footer/Footer';
    import { ipcRenderer } from 'electron';
    const http = require('http');

    ipcRenderer.on('@ELECTRON_DEVTOOLS/CONSOLE', (event, key, ...args) => {
        console.log(...args);
        console.log(key);
    });

    const options = {
        host: 'localhost',
        port: 3000,
        path: '/',
        method: 'GET',
    };

    const response = fetch('http://localhost:3000/')
        .then(res => res.json())
        .then(val => console.log(val));
</script>

<style lang="scss">

</style>

<Header />

<Main />

<Footer />
