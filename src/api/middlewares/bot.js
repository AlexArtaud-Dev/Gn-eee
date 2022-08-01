module.exports = function(req, res, next) {
    // const bearer = req.header('Bot');
    // if (!bearer) return res.status(401).send({ message: "Access Denied - Missing bot token to access this type of data" });
    // next();


    next();
}
