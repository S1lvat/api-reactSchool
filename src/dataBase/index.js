import { Sequelize } from 'sequelize'
import databaseConfig from '../config/database'

import Aluno from '../models/Aluno'
import Foto from '../models/Foto'
import User from '../models/User'

const connection = new Sequelize(databaseConfig)

const models = [Aluno, User, Foto]
models.forEach(model => { model.init(connection) })
models.forEach(model => { model.associate && model.associate(connection.models) })
