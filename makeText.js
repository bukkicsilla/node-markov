/** Command-line tool to generate Markov text. */
const { MarkovMachine } = require("./markov");
const fs = require("fs");
//const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function getGeneratedText(text) {
  const mm = new MarkovMachine(text);
  console.log(mm.makeText());
}
function createText(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error("Cannot read this file", path);
      process.exit(1);
    } else {
      getGeneratedText(data);
    }
  });
}
async function createUrlText(url) {
  let res;
  try {
    res = await axios.get(url);
  } catch (e) {
    console.error("cannot read this url", url);
    process.exit(1);
  }
  getGeneratedText(res.data);
}

let [method, path] = process.argv.slice(2);
console.log(method, path);

if (method === "file") {
  createText(path);
} else if (method === "url") {
  createUrlText(path);
} else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}
