var request = require("request");
comp_id=process.argv[2]
var options = { method: 'GET',
  url: 'http://localhost:3000/SAM',
  qs: { q: `hello_${comp_id}` },
  headers: {}};
request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

setInterval(()=>{
var options = { method: 'GET',
  url: 'http://localhost:3000/SAM',
  qs: { q: comp_id },
  headers: {}};
request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
},1000)


