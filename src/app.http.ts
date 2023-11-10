import http from 'http';
import fs from 'fs';

const server = http.createServer((req,res) => {

    console.log(req.url);

    /* res.writeHead(200, {'Content-Type': 'text/html' });
    res.write('<h1> Hola about!</h1>');
    res.end(); */
/* 
    const data = { name: 'John doe', age: 30, city: 'Argentina' };

    res.writeHead(200, {'Content-Type': 'application/json' });
    res.end( JSON.stringify( data ) ); */

    if(req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.end(htmlFile);
    }else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end();
    }

});

const PORT = 8080;

server.listen(PORT,() => {
    console.log(`Server running on PORT ${PORT}`);
});


