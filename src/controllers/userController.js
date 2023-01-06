import User from '../models/User'

class UserController {
  async store (req, res) {
    try {
      const alunoCriado = await User.create(req.body)

      const { id, nome, email } = alunoCriado

      res.status(200).json({ id, nome, email })
    } catch (e) {
      res.status(400).json({
        Errors: e.errors.map(err => err.message)
      })
    }
  }

  async index (req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] })
      return res.status(200).json(users)
    } catch (e) {
      res.status(400).json({
        Errors: e.errors.map(err => err.message)
      })
    }
  }

  async show (req, res) {
    try {
      const user = await User.findByPk(req.params.id)

      if (!user) {
        return res.status(400).json({ errors: 'Usuario nao existe!' })
      }

      const { id, nome, email } = user

      return res.status(200).json({ id, nome, email })
    } catch (e) {
      res.status(400).json({
        Errors: e.errors.map(err => err.message)
      })
    }
  }

  async update (req, res) {
    try {
      const user = await User.findByPk(req.userId)
      if (!user) {
        return res.status(400).json({ errors: 'Usuario nao existe!' })
      }

      const novosDados = await user.update(req.body)

      const { id, nome, email } = novosDados

      return res.status(200).json({ id, nome, email })
    } catch (e) {
      res.status(400).json({
        Errors: e.errors.map(err => err.message)
      })
    }
  }

  async delete (req, res) {
    try {
      const user = await User.findByPk(req.userId)
      if (!user) {
        return res.status(400).json({ errors: 'Usuario nao existe!' })
      }

      await user.destroy(req.body)

      return res.status(200).json(user)
    } catch (e) {
      res.status(400).json({
        Errors: e.errors.map(err => err.message)
      })
    }
  }
}

export default new UserController()
