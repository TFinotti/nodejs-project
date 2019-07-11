const url = require('url')
const qs = require('querystring')

const content = '<!DOCTYPE html>' +
  '<html>' +
  '    <head>' +
  '        <meta charset="utf-8" />' +
  '        <title>ECE AST</title>' +
  '    </head>' +
  '    <body>' +
  '         <p>Hello everybody, welcome to my page!</p>' +
  '    </body>' +
  '</html>'

module.exports = {
  serverHandle: function (req, res) {

    const route = url.parse(req.url)
    const path = route.pathname
    const params = qs.parse(route.query)


    console.log(path);
    console.log(params);

    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.write(content);

    if (path === '/') {
      res.write('<p>/hello?name=name is going to show the message "Hello" written on the page, followed by the parameter "name" that you provide.' + '</p>')
    } else if (path === '/hello' && 'name' in params && params['name'] !== 'Tiago') {
      res.write('<p>Hello ' + params['name'] + '</p>')
    } else if (path === '/hello' && params['name'] === 'Tiago') {
      res.write('My name is Tiago, I come from Brazil and I study in Canada')
    } else {
      res.write("<h1>404 not found... So sad :(</h1>");
    }

    res.end();
  }
}