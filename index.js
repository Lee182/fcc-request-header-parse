const http = require('http')
const url = require('url')
let port = process.env.PORT || 3000
console.log(port)
function extractStrfromBrachets(str) {
  var b = str.match(/\(.*\)/)
  if (b === null) {return str}
  arr = b[0].split('')
  arr[0] = ''
  arr[arr.length-1] = ''
  return arr.join('')
}

const app = http.createServer(function(req, res){
  if (req.method === 'GET') {
    // var str = url.parse(req.url).pathname === 'whoami'
    let obj = {
      ipaddress: req.connection.remoteAddress,
      language: req.headers['accept-language'].split(',')[0],
      software: extractStrfromBrachets( req.headers['user-agent'] )
    }
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
    res.write( JSON.stringify(obj) )
    res.end()
  }
  res.end()
})

app.listen(port, function(){
  console.log('server listening at http://localhost:'+port+'/')
})
