const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');

// Signup
router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            `INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)`,
            [name, email, hashedPassword, role],
            function (err) {
                if (err) {
                    return res.status(400).json({
                        message: 'User Already Exists'
                    });
                }

                res.json({
                    message: 'User Registered'
                });
            }
        );

    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    db.get(
        `SELECT * FROM users WHERE email=?`,
        [email],
        async (err, user) => {

            if (err) {
                return res.status(500).json({
                    message: 'Database Error'
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'User Not Found'
                });
            }

            const valid = await bcrypt.compare(
                password,
                user.password
            );

            if (!valid) {
                return res.status(400).json({
                    message: 'Wrong Password'
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role
                },
                'secretkey'
            );

            res.json({
                token,
                role: user.role
            });
        }
    );
});

module.exports = router;