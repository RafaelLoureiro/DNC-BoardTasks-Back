async function authDocProducao(req, res, next) {
    const { senhaDigitada } = req.body;

    if (req.headers.host.includes('localhost') || req.originalUrl !== "/doc/") {
        //user in localhost
        return next();
    };
    if (senhaDigitada === process.env.SWAGGER_SENHA_DOC) {
        //passsword is true
        return next();
    };

    if (senhaDigitada) {
        //user password false
        res.status(401).set('Content-Type', 'text/html');
        res.send(Buffer.from(`
            <form method= "post">
                <p style= "color: red";>Senha Invalida!</p>
                <lable for="senhaDigitada">Senha da documentação:</lable>
                <input type="password" name="senhaDigitada" id="senhaDigitada" />
                <button type="submit">Entrar</button>
            </form>
        `))
    } else {
        res.status(200).set('Content-Type', 'text/html');
        res.send(Buffer.from(`
            <form method= "post">
                <lable for="senhaDigitada">Senha da documentação:</lable>
                <input type="password" name="senhaDigitada" id="senhaDigitada" />
                <button type="submit">Entrar</button>
            </form>
        `))
    };
}

module.exports = authDocProducao;