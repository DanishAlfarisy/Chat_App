const authService = require('../services/authServices');


async function register(req, res) {
    const { name, email, password } = req.body;

    try {
        const result = await authService.registerUser(
            name,
            email,
            password
        );

        return res.status(201).json({
            message: 'User berhasil dibuat',
            id: result.insertId
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Gagal melakukan register'
        });
    }
};


async function login(req, res) {
    const { email, password } = req.body;

     try {
        const user = await authService.loginUser(
            email,
            password
        );

        // User tidak ditemukan atau password salah
        if (!user) {
            return res.status(401).json({
                message: 'Email atau password salah'
            });
        }

        // Login berhasil
        return res.status(200).json({
            message: 'Login berhasil',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Terjadi kesalahan server'
        });
    }
};

module.exports = {
    register,
    login
};