const express = require('express.js')
const next = require('next.js')

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});

const handle = app.getRequestHandler();

app.prepare()
.then(()=>{
  const server = express()

  server.get('*', (req, res) => {
    return handle(req, res);
  })

  server.listen(3000, (err)=>{
  	if (err) throw error
  	console.log('> Ready on localhost:3000')
  })

})

.catch((ex)=> {
	console.log(ex.stack)
	process.exit(1)
})