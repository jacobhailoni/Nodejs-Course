const http = require('http');

const server = http.createServer((req,res)=>{

    if (req.url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>')
        res.write('<head><title>First Assignment</title></head>')
        res.write('<body>')
        res.write('<h1>Welcome to my first assignment</h1>')
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"></input><button type="submit">Submit</button></form>')
        res.write('</body>')
        res.end('</html>')
    }
    if (req.url === '/users'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>')
        res.write('<head><title>First Assignment</title></head>')
        res.write('<ul><li>User1</li><li>User2</li><li>User3</li><li>User4</li><li>User5</li></ul>')
        res.end('</html>')
    }
    else if(req.url === '/create-user' && req.method === 'POST'){
        const bodyReq = [];
    
        req.on('data', chunk => bodyReq.push(chunk));
    
        return req.on('end', () => {
          const parseBody = Buffer.concat(bodyReq).toString().split('&');
    
          parseBody.forEach(item => {
            const data = item.split('=');
    
            console.log(data[0],data[1]);
          });
    
          res.writeHead(302, {Location: '/users'});
    
          return res.end();
        });
    }
})

server.listen(3000);