require('dotenv').config();
const http = require('http');

http.createServer(function(req, res) {
    console.log('http://localhost:3000/');

    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        
        const timeEnd = new Date().getTime() + parseInt(process.env.INTERVALEND);
        const interval = setInterval(() => {
            const currentDate = new Date();

            if (currentDate.getTime() > timeEnd) {
                clearInterval(interval);
                res.end(currentDate.toUTCString());
                console.log('Complete! Date: ');
            }
            console.log(currentDate.toUTCString());

        }, parseInt(process.env.INTERVAL));
    }
}).listen(3000);