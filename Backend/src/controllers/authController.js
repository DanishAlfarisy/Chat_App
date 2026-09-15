const authService = require('../services/authServices');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const result = await authService.registerUser(
            name,
            email,
            password
        );

        res.status(201).json({
            message: 'User berhasil dibuat',
            id: result.insertId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Gagal melakukan register'
        });
    }
};

module.exports = {
    register
};