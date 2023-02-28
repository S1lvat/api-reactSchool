import Aluno from '../models/Aluno'
import Foto from '../models/Foto'

class AlunoController {
  async store (req, res) {
    try {
      const aluno = req.body

      const alunoCriado = await Aluno.create(aluno)

      return res.status(200).json(alunoCriado)
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }

  async index (req, res) {
    try {
      const alunos = await Aluno.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        include: {
          model: Foto,
          attributes: ['filename', 'url']
        },
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']]
      })
      res.status(200).json(alunos)
    } catch (e) {
      res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }

  async show (req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['Por favor, digite um id valido!']
        })
      }

      const aluno = await Aluno.findByPk(req.params.id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        include: {
          model: Foto,
          attributes: ['filename', 'url']
        },
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']]
      })

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno nao existe!']
        })
      }

      res.status(200).json(aluno)
    } catch (e) {
      res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }

  async update (req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['Por favor, digite um id valido!']
        })
      }

      const aluno = await Aluno.findByPk(req.params.id)

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno nao existe!']
        })
      }

      const alunoEditado = await aluno.update(req.body)

      res.status(200).json(alunoEditado)
    } catch (e) {
      res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }

  async delete (req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['Por favor, digite um id valido!']
        })
      }

      const aluno = await Aluno.findByPk(req.params.id)

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno nao existe!']
        })
      }

      await aluno.destroy()

      res.status(200).json('Aluno apagado com sucesso!')
    } catch (e) {
      res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }
}

export default new AlunoController()
