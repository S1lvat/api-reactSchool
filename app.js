import express from 'express'
import homeroutes from './src/routes/homeRoutes'

class App {
  constructor () {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.app.use(express.json())
  }

  routes () {
    this.app.use('/', homeroutes)
  }
}

export default new App().app
