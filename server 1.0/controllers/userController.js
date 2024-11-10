const User = require("../models/userModel.js");

const UserController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.getAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: "Error fetching users" });
        }
    },
    getUserById: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.getById(id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: "Error fetching user" });
        }
    },
    createUser: async (req, res) => {
        const { name, email } = req.body;
        try {
            const newUser = await User.create(name, email);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: "Error creating user" });
        }
    }
};

module.exports = UserController;
