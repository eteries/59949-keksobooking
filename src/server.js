const http = require(`http`);

const PORT = 3000;
const HOSTNAME = `127.0.0.1`;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end();
});

module.exports = {
  name: `server`,
  description: `runs local server`,
  execute() {
    server.listen(PORT, HOSTNAME, () => {
      console.log(`server started at http://${HOSTNAME}:${PORT}/`);
    });
  }
};
