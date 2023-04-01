import app from './app.js'

const port = process.env.PORT_SERVER
app.listen(port, () => { console.log(`listen on port: ${port}`) })
