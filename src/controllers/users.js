const { hashPassword } = require('../config/encript');
const UsersModel = require('../model/users');
const { Op } = require('sequelize');
const { checkDataLogin } = require('../config/middleware');
const bcrypt = require('bcrypt');

module.exports = {
    getData: async (req, res) => {
        try {
            let data = await UsersModel.findAll();

            res.status(200).send(data);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    regis: async (req, res) => {
        try {
            console.log(req.body);
            let { username, email, phone, password, confirmPass } = req.body;
            let data = await UsersModel.findAll({
                where: {
                    [Op.or]: [
                        { email },
                        { username },
                        { phone }
                    ]
                }
            });
            console.log(data);
            if (data.length > 0) {
                res.status(400).send({
                    success: false,
                    msg: 'This account already exist ⚠️'
                })
            } else {
                if (password.length >= 8 && password == confirmPass) {
                    // fungsi create
                    let results = await UsersModel.create({
                        username, email, phone, password: hashPassword(password)
                    })
                    res.status(200).send({
                        success: true,
                        msg: 'Register Success ✅'
                    })
                } else {
                    res.status(400).send({
                        success: false,
                        msg: 'Your password is not match ⚠️'
                    })
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    login: async (req, res) => {
        try {
            console.log(checkDataLogin(req.body.data));
            let get = await UsersModel.findAll({
                where: checkDataLogin(req.body.data)
            })
            console.log(get[0].dataValues);
            let checkPass = bcrypt.compareSync(req.body.password, get[0].dataValues.password);

            if (get.length == 0) {
                res.status(401).send({
                    success: false,
                    msg: 'Account not found ⚠️'
                })
            } else {
                if (checkPass) {
                    let results = await UsersModel.update({
                        failed_counter: 0
                    }, { where: { id: get[0].dataValues.id } })
                    res.status(200).send({
                        success: true,
                        msg: 'Login Success ✅',
                        data: get[0].dataValues
                    })
                } else {
                    if (get[0].dataValues.failed_counter == 3) {
                        let results = await UsersModel.update({
                            status: 'suspended'
                        }, { where: { id: get[0].dataValues.id } })
                        res.status(400).send({
                            success: false,
                            msg: 'Your Account is SUSPENDED ⚠️'
                        })
                    } else {
                        let results = await UsersModel.update({
                            failed_counter: get[0].dataValues.failed_counter + 1
                        }, { where: { id: get[0].dataValues.id } })
                        res.status(400).send({
                            success: false,
                            msg: 'Your password is wrong ⚠️',
                            failed_login: get[0].dataValues.failed_counter + 1
                        })
                    }
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}