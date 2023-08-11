const S = require('string');

function tratarErrosEsperados(res, err) {

    //Entra quando o mongoose der erro
    if (String(err).includes(`ValidationError:`)) {
        return res.status(400).json({
            status: "Erro",
            statusMensagem: S(String(err).replace("ValidationError", "")).replace(':', '').s,
            resposta: String(err)
        });

    }
    //pode ser um erro manual definido por eu
    if (String(err).includes(`Error:`)) {
        return res.status(400).json({
            status: "Erro",
            statusMensagem: String(err).replace("Error: ", ""),
            resposta: String(err)
        })
    }


    //erro inesperado
    console.error(err);
    return res.status(500).json({
        status: "Erro",
        statusMensagem: "Houve um erro inseperado, tente mais tarde.",
        resposta: String(err)
    });


}

module.exports = tratarErrosEsperados;