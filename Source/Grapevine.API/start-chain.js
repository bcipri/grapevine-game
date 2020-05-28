const app = require("./app.js");
const app2 = require("./app.js");
const app3 = require("./app.js");
const app4 = require("./app.js");

app.listen(8081, () => {
  console.log("Server 1 running on port 8081");
});

app2.listen(8082, () => {
  console.log("Server 2 running on port 8082");
});

app3.listen(8083, () => {
  console.log("Server 3 running on port 8083");
});

app4.listen(8084, () => {
  console.log("Server 4 running on port 8084");
});