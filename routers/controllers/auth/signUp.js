const db = require("./../../../db/db");
const bcrypt = require("bcrypt");

const register = (req, res) => {
  console.log("google register",req.body);
  const { firstName, lastName, age, email, password, role_id, img } = req.body;

  const query = `SELECT email FROM users WHERE email = ? AND is_deleted =0`;
  const data = [email];
  db.query(query, data, async (err, result) => {
    if(err)res.send("email is exist");
    if (result.length == 0) {
      const query = `INSERT INTO users (firstName,lastName,age,email,password,role_id,img) VALUES (?,?,?,?,?,1,?);`;
      let pass = await bcrypt.hash(password, 10);
      const arr = [
        firstName,
        lastName,
        age,
        email.toLowerCase(),
        pass,
        role_id,
        img,
      ];
      db.query(query, arr, (err1, result) => {
        if(err1)res.send("email is exist")
                const query = `SELECT * FROM users WHERE email = ?;`;
        const data3 = [email];
        db.query(query, data3, (err, result3) => {
          if (err)return res.status(400).json(err);
          res.status(200).json(result3);
        });
      });
    } else {
      res.status(400).send({message:result,status:400});
    }
  });
};

module.exports = {
  register,
};
