// Implémenter votre serveur ici
const net = require('net');

let db = {}

const server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected');

  c.on('end', () => {
    console.log('client disconnected');
  });

  c.on('data', (data) => {
    console.log(data.toString());
    if(data.toString().match(/KEYS\n/)) {
      c.write(Object.keys(db).join("\n") + "\n")
    } else if (data.toString().match(/PUT (\w+) (\d)+/)) {
      const extract = /PUT (\w+) (\d)+ (.+)/.exec(data.toString());
      if (extract[1].length > 0 && parseInt(extract[2]) > 0) {
        db[extract[1]] = extract[3].replace("\n", "")
        c.write("ok\n")
      } else {
        c.write("ko\n")
      }
    } else if (data.toString().match(/GET (\w+)\n/)) {
      const extract = /GET (\w+)\n/.exec(data.toString());
      if (extract[1].length > 0) {
        if (db[extract[1]]) {
          c.write(db[extract[1]] + "\n")
        } else {
          c.write("0\n")
        }
      } else {
        c.write("ko\n")
      }
    } else if (data.toString().match(/DEL (\w+)\n/)) {
      const extract = /DEL (\w+)\n/.exec(data.toString());
      if (extract[1].length > 0 && db[extract[1]]) {
        delete db[extract[1]];
        c.write("ok\n")
      } else {
        c.write("ko\n")
      }
    } else {
      c.write("0\n")
    }
  });
});

server.on('error', (err) => {
  throw err;
});

server.listen(8123, () => {
  console.log('server bound');
});
