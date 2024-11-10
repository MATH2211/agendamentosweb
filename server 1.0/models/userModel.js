const pool = require("../config/config.js");

const User = {
    getAll: async () => {
        const result = await pool.query("SELECT * FROM users");
        return result.rows;
    },
    getById: async (id) => {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        return result.rows[0];
    },
    create: async (name, email) => {
        const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        return result.rows[0];
    }
};

module.exports = User;
