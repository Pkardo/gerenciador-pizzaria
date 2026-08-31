const jwt = require('jsonwebtoken');

function somenteADM(req, res, next) {
    if (req.usuario.tipo !== 'admin') {
        return res.status(403).json({ mensagem: "Acesso permitido apenas para administradores" });
    }
    next();
}

module.exports = somenteADM;