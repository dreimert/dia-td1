const net = require('net');

const createClient = () => {
  return new Promise((resolve, reject) => {
    const client = net.createConnection({ port: 8123 }, () => {
      console.log('1) connected to server!');
      resolve(client);
    });

    client.on('error', (err) => {
      console.error(err.toString());
      if (err.code === 'ECONNREFUSED') {
        console.info("Impossible d'établir la connexion sur le port " + err.port + ".");
        console.info("Est-ce le bon port ? Votre serveur fonctionne t'il ?");
      }
      client.end();
      reject(err);
    });

    client.on('end', () => {
      console.log('disconnected from server');
    });
  })
}

let client;

const write = (command) => () => {
  console.log(">>>", command);
  client.write(command + '\n');
}

const read = (func) => () => {
  return new Promise((resolve, reject) => {
    client.once('data', (data) => {
      console.log("<<<", data.toString());
      func(data, resolve, reject);
    });
  })
}

const close = () => {
  client.end();
}

createClient()
.then((cli) => {
  client = cli;
})
.then(write('PUT bonjour 5 hello'))
.then(read((data, resolve, reject) => {
  if (data.toString() === "ok\n") {
    console.info("2) PUT success")
    resolve("2) PUT success")
  } else {
    console.error("2) PUT fail")
    reject("2) PUT fail")
  }
}))
.then(write('KEYS'))
.then(read((data, resolve, reject) => {
  if (data.toString() === "bonjour\n") {
    console.info("3) KEYS success")
    resolve("3) KEYS success")
  } else {
    console.error("3) KEYS fail")
    reject("3) KEYS fail")
  }
}))
.then(write('GET bonjour'))
.then(read((data, resolve, reject) => {
  if (data.toString() === "hello\n") {
    console.info("4) GET success")
    resolve("4) GET success")
  } else {
    console.error("4) GET fail")
    reject("4) GET fail")
  }
}))
.then(write('DEL bonjour'))
.then(read((data, resolve, reject) => {
  if (data.toString() === "ok\n") {
    console.info("5) DEL success")
    resolve("5) DEL success")
  } else {
    console.error("5) DEL fail")
    reject("5) DEL fail")
  }
}))
.then(write('GET bonjour'))
.then(read((data, resolve, reject) => {
  if (data.toString() === "0\n") {
    console.info("6) GET success")
    resolve("6) GET success")
  } else {
    console.error("6) GET fail")
    reject("6) GET fail")
  }
}))
.catch((err) => {
  console.error("ERROR: ", err);
})
.then(close)
