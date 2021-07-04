const db = require("../../db/db");
const bcrypt = require("bcrypt");

const acceptDoctor = async (req, res) => {
  const { password, doctor_id } = req.body;
  let userResult = [{ id: 7 }];
  const arr = [doctor_id];
  let hashed = await bcrypt.hash(password, 10);

// select the doctor from doctor table
  const command = `SELECT * FROM doctors WHERE doctor_id = ?`;
  db.query(command, arr, (err, result) => {
    console.log(result);
    const arr1 = [
      result[0].firstName,
      result[0].lastName,
      result[0].age,
      result[0].email,
      hashed,
    ];

    //insert doctor info to users table
    const command1 = `INSERT INTO users (firstName,lastName,age,email,password,role_id) VALUES (?,?,?,?,?,2)`;
    db.query(command1, arr1, (err, result) => {
      if (err) return res.send(err);
    });


    const arr11 = [result[0].email];
    const command11 = `SELECT * FROM users WHERE email = ?`;
    db.query(command11, arr11, async (err, result22) => {
      console.log("select", result);
      userResult = await result22;
      const arr2 = [
        userResult[0].id,
        result[0].description,
        result[0].Qualifications,
        result[0].practicalExperiences,
      ];

      //insert doctor info to doctorsDetails table
      const command2 = `INSERT INTO doctorsDetails (user_id,description,Qualifications,practicalExperiences) VALUES (?,?,?,?)`;
      db.query(command2, arr2, (err, result) => {
        if (err) return res.send(err);
      });


      //update is_deleted in doctors table
      const command3=`UPDATE doctors SET is_deleted=1 WHERE email=?`
      db.query(command3,arr11,(err,result)=>{
        res.status(201).json("doctor add successfully");

      })
    });
  });
};

module.exports = {
  acceptDoctor,
};
