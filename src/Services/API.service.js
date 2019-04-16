const server = process.env.REACT_APP_SERVER;
const port = process.env.REACT_APP_SERVER_PORT;

export function getUrl() {
    return server + ':' + port + '/api/';
}