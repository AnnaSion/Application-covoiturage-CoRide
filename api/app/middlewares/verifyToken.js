const jwt = require("jsonwebtoken");

/**
 * this express middleware verify JWT for api access
 * @param {request} req 
 * @param {response} res 
 * @param {function} next 
 */
module.exports = (req, res, next) => {

    //on récupere la propriété authorization du header
    const authHeader = req.headers.authorization;

    //si elle existe...
    if (authHeader) {

        //on récupere le token
        const token = authHeader.split(" ")[1];

        //on décode le token
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        //on extrait l'id du user du token
        const userIdinToken = decodedToken.id;

        //on récupere l'id du user dans la requete
        const userId = req.body.id || req.params.id || req.params.userId;

        //on compare les 2, si different erreur 401 sinon next
        if (userId && userId != userIdinToken) {
            res.status(401).json("invalid user id...");
        } else {
            next();
        }
    //sinon erreur 401
    }else{
        res.Status(401).json("invalid request...");
    }
}