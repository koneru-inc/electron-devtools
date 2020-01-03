import Console from '../components/Console/Console.svelte';
import Network from '../components/Network/Network.svelte';
import Api from '../components/Api/Api.svelte';
import Rpc from '../components/Rpc/Rpc.svelte';

const routes = {
    '/console': Console,
    '/network/': Network,
    '/api/': Api,
    '/rpc/': Rpc,
}

export default routes