const { getCorrectUser } = require("../../queries/auth");
const { hash, serialize } = require("../../utils");
const { login } = require("../../errors/auth");
const errors = require("../../errors/commons");


module.exports = (db) => async (req, res, next) => {
    const { email, password } = req.body;
    
    const queryResult = await getCorrectUser(db)({
        email,
        compareFn: hash.compare(password)
    })

    if(!queryResult.ok) return next(login[queryResult.code] || errors[500]);

    serialize(res, {email: queryResult.data.email })

    res.status(200).json({
        success:true,
        message: "Ok login"
    })
}