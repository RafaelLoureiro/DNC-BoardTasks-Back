const mogoose = require('mongoose');


const esquema = new mogoose.Schema(
    {
        posicao: {
            type: Number,
            require: 'é obrigatório!',
        },
        titulo: {
            type: String,
            require: 'é obrigatório!',
        },
        descricao: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            require: 'é obrigatório!',
        },
        dataEntrega: {
            type: Date,
            default: null,
        },
        usuarioCriador: {
            type: mogoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            require: 'é obrigatório!',
        },
    },
    {
        timestamps: true
    }
);

const EsquemaTarefa = mogoose.models.Tarefa || mogoose.model('Tarefa', esquema);
module.exports = EsquemaTarefa;