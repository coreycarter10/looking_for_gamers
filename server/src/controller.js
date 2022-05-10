const bcrypt = require("bcryptjs");
const sequelize = require("../db/sequelize");

module.exports = {
  signUp: async (req, res) => {
    const { username, email, password } = req.body;

    let salt = bcrypt.genSaltSync(25);

    let passwordHash = await bcrypt.hash(password, salt);

    await sequelize.query(`
        INSERT INTO users(username, email, password)
        VALUES (
            '${username}',
            '${email}',
            '${passwordHash}'
        )
    `);

    const userInfo = await sequelize.query(
      `SELECT id, username, email FROM users WHERE email = '${email}'
    `
    );

    const cleanedUser = {
      username: userInfo.username,
      email: userInfo.email,
    };
    res.status(200).send(cleanedUser);
  },

  login: async (req, res) => {
    const { email, password } = req.body; // email or username here?

    const validUser = await sequelize
      .query(
        `
        SELECT * FROM users WHERE email = '${email}'
      `
      )
      .catch((err) => console.log(err));

    if (validUser[1].rowCount !== 1)
      return res
        .status(401)
        .send("You must create an account before logining in!");

    if (!bcrypt.compareSync(password, validUser[0][0].password))
      return res.status(401).send("Email or password is incorrect");

    let user = {
      id: validUser[0][0].id,
      username: validUser[0][0].username,
      email: validUser[0][0].email,
    };
    res.status(200).send(user);
  },
};
