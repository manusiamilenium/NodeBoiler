var jwt = require('jsonwebtoken'); 
module.exports = function(req,res,next) {
    // refresh the damn token
    const postData = req.body ||req.query
    // if refresh token exists
    if((postData.refreshToken) && (postData.refreshToken in global.tokenList)) {
        const user = {
            "id": postData.id,
            "first_name": postData.first_name,
            "last_name": postData.last_name
        }
        const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
        const response = {
            "token": token,
        }
        // update the token in the list
        global.tokenList[postData.refreshToken].token = token
        console.log(global.tokenList);
        next();       
    } else {
        res.status(404).send('Invalid request');
    }
}