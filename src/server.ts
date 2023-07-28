import app from './app';
import connect from './services/connect';
const http = require('http');


connect().then(() => {
    console.log("Connected to database");
});
const server = http.createServer(app);
server.listen(5000, () => {console.log("Server started on port 5000")});