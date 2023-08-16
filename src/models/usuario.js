const mogoose = require('mongoose');
const validator = require('validator');

const esquema = new mogoose.Schema(
    {
        nome: {
            type: String,
            require: 'é obrigatório!',
        },
        email: {
            type: String,
            unique: true,
            require: 'é obrigatório!',
            lowercase: true,
            index: true,
            validate: {
                validator: (valorDigitado) => { return validator.isEmail(valorDigitado) },
                mensage: 'inválido!'
            }
        },
        senha: {
            type: String,
            require: 'é obrigatório!',
            select: false,
        },
    },
    {
        timestamps: true
    }
);

const EsuemaUsuario = mogoose.models.Usuario || mogoose.model('Usuario', esquema);
module.exports = EsuemaUsuario;