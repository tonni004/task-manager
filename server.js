const jsonServer = require('json-server');
console.log('json-server loaded');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

server.use(router);

const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});
