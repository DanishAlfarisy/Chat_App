const authService = require('../services/authServices');


const register = (req, res) => {

    const { name, email, password } = req.body;

    authService.registerUser(
        name,
        email,
        password,
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: 'Gagal melakukan register'
                });
            }

            res.status(201).json({
                message: 'User berhasil dibuat',
                id: result.insertId
            });
        }
    );
};


const login = (req, res) => {

    const { email, password } = req.body;

    authService.loginUser(
        email,
        password,
        (err, user) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: 'Terjadi kesalahan server'
                });
            }

            if (!user) {
                return res.status(401).json({
                    message: 'Email atau password salah'
                });
            }

            return res.status(200).json({
                message: 'Login berhasil',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        }
    );
};


module.exports = {
    register,
    login
};