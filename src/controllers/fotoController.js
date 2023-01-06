import multer from 'multer'
import multerConfig from '../config/multer'

import Foto from '../models/Foto'

const upload = multer(multerConfig).single('Foto')

class FotoController {
  store (req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          Errors: [err.code]
        })
      }

      try {
        const { originalname, filename } = req.file
        const { aluno_id } = req.body

        const foto = await Foto.create({ originalname, filename, aluno_id })

        return res.status(200).json(foto)
      } catch (err) {
        return res.status(400).json({
          Errors: ['Usuario nao existe!']
        })
      }
    })
  }
}

export default new FotoController()
