import * as http from 'http';
import { LogItem } from './types';

const sendLogsToRenderProcess = (logData: LogItem[]): void => {
    http.createServer((request, response) => {
        if (request.method == 'GET') {
            response.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            const data = JSON.stringify(logData);
            response.end(data);
        }
    }).listen(3000);
};

export default sendLogsToRenderProcess;
