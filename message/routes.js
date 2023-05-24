const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  res.setHeader('Content-Type', 'text/html');

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write(`
    <body>
        <form action="/message" method="POST">
            <input type="text" name="message">
            <button type="submit">Send</button>
        </form>
    </body>`);
    res.write('</html>');

    return res.end();
  }
  else if (url === '/message' && method === 'POST') {
    const body = [];

    req.on('data', chunk => body.push(chunk));

    return req.on('end', () => {
      const parserBody = Buffer.concat(body).toString();
      const message = parserBody.split('=')[1];

      fs.writeFile('message.txt', message, err => {
        res.writeHead(302, {'Location': '/'});
        return res.end();
      });


    });

  }
  res.write('<html>');
  res.write('<head><title>My first page</title></head>');
  res.write('<body><h1>Hello from me Node.js server</h1></body>');
  res.write('</html>');
  res.end();
};
module.exports = {
  handler: requestHandler
};