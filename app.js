require('dotenv').config();
const http = require('http');
const moment = require('moment');

http.createServer(function(req, res) {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('<h1>RUN</h1>');
        
        const timeEnd = moment().add(parseInt(process.env.INTERVALEND), 'milliseconds');

        const interval = setInterval(() => {
            const currentTime = moment().format('HH:mm:ss');

            console.log(currentTime);

            if (currentTime > timeEnd.format('HH:mm:ss')) {
                clearInterval(interval);
                console.log(moment().format());
            }
        }, parseInt(process.env.INTERVAL));
        
    }
}).listen(3000);