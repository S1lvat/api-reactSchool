import User from '../models/User'
import jwt from 'jsonwebtoken'

class TokenController {
  async store (req, res) {
    const { email = '', password = '' } = req.body

    if (!email || !password) {
      return res.status(400).json({
        errors: ['Credenciais invalidas!']
      })
    }

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(400).json({
        errors: ['Usuario nao existe!']
      })
    }

    if (!(await user.validaSenha(password))) {
      return res.status(401).json({
        errors: ['Senha incorreta!']
      })
    }

    const { id } = user
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION
    })
    res.status(200).json({ token })
  }
}

export default new TokenController()
