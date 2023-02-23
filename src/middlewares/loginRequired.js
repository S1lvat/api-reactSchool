import jwt from 'jsonwebtoken'
import User from '../models/User'

export default async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      errors: ['Voce precisa estar logado!']
    })
  }

  const [, token] = authorization.split(' ')

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET)
    const { id, email } = dados

    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      return res.status(401).json({
        errors: ['Email editado! Novo Token necessario!']
      })
    }

    req.userId = id
    req.userEmail = email
    return next()
  } catch (e) {
    return res.status(401).json({
      errors: ['Token invalido ou expirado!']
    })
  }
}
