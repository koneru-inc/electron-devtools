import App from './components/App.svelte';
import './styles/index.scss';

const app = new App({
    target: document.body,
    props: {
        name: 'Svelte',
    },
});

export default app;
