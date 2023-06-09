import { resolve, join } from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: join(__dirname, '..', '.env') })

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import homeRoutes from './routes/homeRoutes'
import userRoutes from './routes/userRoutes'
import tokenRoutes from './routes/tokenRoutes'
import alunoRoutes from './routes/alunoRoutes'
import fotoRoutes from './routes/fotoRoutes'

import './dataBase'

class App {
  constructor () {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.app.use(cors())
    this.app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')))
  }

  routes () {
    this.app.use('/', homeRoutes)
    this.app.use('/users/', userRoutes)
    this.app.use('/tokens/', tokenRoutes)
    this.app.use('/alunos/', alunoRoutes)
    this.app.use('/fotos/', fotoRoutes)
  }
}

export default new App().app
