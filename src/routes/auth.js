const { Router } = require('express');
const dataSource = require('../db/index');
const jwt = require('jsonwebtoken');
const encript = require('../middlewares/encript');
const { validateRegister, validateLogin } = require('../middlewares/validateInput');
const verifyToken = require('../middlewares/jwt');

function createUserRouter(params) {
    const router = new Router();
    router.post('/registro/', validateRegister, async (req, res) => {
        try {
            const User = await dataSource.getRepository("User");
            const usuarioNuevo = {
                name: req.body.name,
                email: req.body.email,
                password: encript(req.body.password)
            }
            const data = await User.save(usuarioNuevo)
            return res.status(201).json(data);
        } catch (error) {
            const msj = error.message
            res.status(417).send('You need to complete all the information.' + msj);
        }
    });
    router.post('/ingresar/', validateLogin, async (req, res) => {
        try {
            const { JWT_SECRET } = process.env;
            const user = await dataSource.getRepository("User");
            const mail = await user.findOne({
                where: {
                    email: req.body.email,
                    password: encript(req.body.password)
                }
            });
            if (mail !== null) {
                jwt.sign({ mail }, JWT_SECRET, (err, token) => { res.json({ token }) });
            } else {
                res.status(400).send('Wrong email and/or password');
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    })
    router.get('/me/', verifyToken, async (req, res) => {
        const userProfile = req.user;
        return res.status(200).json(userProfile.mail);
    })
    return router;
};

module.exports = createUserRouter;
