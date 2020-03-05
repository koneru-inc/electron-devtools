import App from './components/App.svelte';
import './styles/index.scss';
import { push } from 'svelte-spa-router';

const app = new App({
    target: document.body,
    props: {
        name: 'Svelte',
    },
});

push('/Console'); // First page to look

export default app;
