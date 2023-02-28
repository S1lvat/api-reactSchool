"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

class AlunoController {
  async store (req, res) {
    try {
      const aluno = req.body

      const alunoCriado = await _Aluno2.default.create(aluno)

      return res.status(200).json(alunoCriado)
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }

  async index (req, res) {
    try {
      const alunos = await _Aluno2.default.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        include: {
          model: _Foto2.default,
          attributes: ['filename', 'url']
        },
        order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']]
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

      const aluno = await _Aluno2.default.findByPk(req.params.id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        include: {
          model: _Foto2.default,
          attributes: ['filename', 'url']
        },
        order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']]
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

      const aluno = await _Aluno2.default.findByPk(req.params.id)

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

      const aluno = await _Aluno2.default.findByPk(req.params.id)

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

exports. default = new AlunoController()
