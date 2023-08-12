const http = require("http");
const fs = require("fs");
const path = require("path");

const hostname = 'localhost';
const port = 8000;

const htmlFileHandler = function (req, res) {
    const file = path.join(__dirname, "serverAss.html");
    fs.readFile(file, function (error, html) {
        if (error) {
            console.error(error);
            res.writeHead(500);
            res.end("Error loading HTML file");
        } else {
            res.setHeader("Content-Type", "text/html");
            switch(req.url) {
                case '/': 
                res.writeHead(200);
                res.write(html);
                res.end();
                    break;
                case '/index.html': 
                res.writeHead(200);
                res.write(html);
                res.end();
                    break;
                case '/{random}.html':
                    res.writeHead(404);
                    break;
                default:
                    res.writeHead(404);
                    res.end('Page Not Found');
            }
        }
    });
}

const server = http.createServer(htmlFileHandler)
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    })