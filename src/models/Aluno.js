import Sequelize, { Model } from 'sequelize'

export default class Aluno extends Model {
  static init (sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 255],
            msg: 'O nome deve conter entre 2 e 255 caracteres!'
          }
        }
      },
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 255],
            msg: 'O nome deve conter entre 2 e 255 caracteres!'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'Email invalido!'
          }
        },
        unique: {
          msg: 'Email ja existe!'
        }
      },
      idade: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'A idade deve ser um numero inteiro!'
          }
        }
      },
      peso: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Insira um peso valido!'
          }
        }
      },
      altura: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Insira uma altura valida!'
          }
        }
      }
    }, {
      sequelize
    })
    return this
  }

  static associate (models) {
    this.hasMany(models.Foto, { foreignKey: 'aluno_id' })
  }
}
