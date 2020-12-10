const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const db = require("../model");
const keys = require("../config/keys");

// Defining methods for the booksController
module.exports = {
    register: function (req, res) {
        const { errors, isValid } = validateRegisterInput(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        db.User.findOne({ email: req.body.email }).then((userExist) => {
            if (userExist) {
                // if user with that email exist in database
                errors.email = "Email Already Exist"
                return res.status(400).json(errors)
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash
                    newUser
                        .save()
                        .then((user) => res.json(user))
                        .catch((err) => console.log(err))
                    })
                })
            }
        });
    },
    login: function (req, res) {
        const { errors, isValid } = validateLoginInput(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        const email = req.body.email
        const password = req.body.password

        // find user by email

        db.User.findOne({ email }).then((user) => {
            // check for user email

            if (!user) {
                errors.emailLogin = "User Not Found"
                return res.status(404).json(errors)
            }

            // check for password
            // bcrypt compares the password in db with entered password in login form

            bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                //res.json({ msg: 'success' });
                // if they match then grab the id and name from db and assign to local payload object keys

                const payload = { id: user.id, name: user.name }

                // jwt checks for payload and access keys and creates sessions of assigned particular time .

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: "2h" },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token,
                        })
                    }
                )
            } else {
                errors.passwordLogin = "Incorrect Password"
                return res.status(404).json(errors)
            }
            })
        });
    },
    current: function (req, res) {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
        })
    }
}



