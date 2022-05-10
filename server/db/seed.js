const sequelize = require("./sequelize");

module.exports = {
  seed: (req, res) => {
    sequelize.query(`
        drop table if exists users;
        
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(75),
            email VARCHAR(75),
            password VARCHAR(255)
        );
        
        `);
  },
};
