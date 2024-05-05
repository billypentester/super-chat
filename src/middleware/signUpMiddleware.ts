export const signUpMiddleware = (req, res, next) => {
    const { name, email, password } = req.body
    if(name && email && password) {
        next()
    }
    else {
        res.status(400).json({
            message: 'Bad Request'
        })
    }
}