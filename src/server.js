const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const util = require(`util`);
const pathUtil = require(`path`);

const stat = util.promisify(fs.stat);
const readfile = util.promisify(fs.readFile);

const PORT = 3000;
const HOSTNAME = `127.0.0.1`;

const fileType = {
  'css': `text/css`,
  'html': `text/html; charset=UTF-8`,
  'jpg': `image/jpeg`,
  'png': `image/png`,
  'gif': `image/gif`,
  'ico': `image/x-icon`
};


const readFile = async (path, res) => {
  const data = await readfile(path);
  const fileExt = pathUtil.extname(path).replace(/\./, ` `).trim();
  let contentType = ``;

  await Object.keys(fileType).map((key) => {
    if (key === fileExt) {
      contentType = fileType[key];
    }
  });
  res.setHeader(`content-type`, contentType);
  res.setHeader(`content-length`, Buffer.byteLength(data));
  res.end(data);
};

const indexFile = async (path, res) => {
  const data = await readfile(`${path}index.html`);
  res.setHeader(`content-type`, `text/html; charset=UTF-8`);
  res.setHeader(`content-length`, Buffer.byteLength(data));
  res.end(data);
};

const server = http.createServer(async (req, res) => {
  const path = `${process.cwd()}/static` + url.parse(req.url).pathname;

  try {
    await stat(path);

    res.statusCode = 200;
    res.statusMessage = `OK`;

    if (url.parse(req.url).pathname === `/`) {
      await indexFile(path, res);
    } else {
      await readFile(path, res);
    }
  } catch (err) {
    console.log(err);
    res.writeHead(404, `Not Found`);
    res.end();
  }
});

module.exports = {
  name: `server`,
  description: `runs local server`,
  execute(port) {
    server.listen(port || PORT, HOSTNAME, () => {
      console.log(`server started at http://${HOSTNAME}:${port || PORT}/`);
    });
  }
};
