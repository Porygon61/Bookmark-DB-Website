var fs = require('fs');
var http = require('http');

http.createServer(function (req, res) {
  fs.readFile('./demoHTML.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
  fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) { //append content
    if (err) throw err;
    console.log('Saved!');
  });
  fs.open('mynewfile2.txt', 'w', function (err, file) { //odo something with file
    if (err) throw err;
    console.log('Saved!');
  });
  fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) { //overwrite content
    if (err) throw err;
    console.log('Saved!');
  });
  fs.unlink('mynewfile2.txt', function (err) { //delete file
    if (err) throw err;
    console.log('File deleted!');
  });
  fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) { //rename file
    if (err) throw err;
    console.log('File Renamed!');
  });
}).listen(8080);