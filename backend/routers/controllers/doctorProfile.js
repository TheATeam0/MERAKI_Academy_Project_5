const db = require("../../db/db");

//as a doctor, I can see my profile

const getDoctorProfile = (req, res) => {
  const user_id = req.token.id;

  const command = `SELECT users.firstName ,users.lastName,users.age,users.email,users.img,doctorsDetails.price,
doctorsDetails.Qualifications,doctorsDetails.practicalExperiences,doctorsDetails.description
FROM users 
INNER JOIN doctorsDetails ON users.id = doctorsDetails.user_id WHERE users.is_deleted =0 AND  user_id = ?`;
  const arr = [user_id];
  db.query(command, arr, (err, result) => {
    if (err) return res.status(400).send(err);
    if (!result.length) {
      return res.status(200).json("doctor profile has been deleted");
    }
    console.log(result);
    res.status(200).json(result);
  });
};

//as a doctor, after the admin accept me I can full my information

const createDetails = (req, res) => {
  const { description, price, Qualifications, practicalExperiences } = req.body;
  const user_id = req.token.id;
  const arr = [
    description,
    price,
    Qualifications,
    practicalExperiences,
    user_id,
  ];

  const command = `INSERT INTO doctorsDetails  (  description,price, Qualifications, practicalExperiences,user_id) VALUES (?,?,?,?,?)`;
  db.query(command, arr, (err, result) => {
    if (err) res.status(400).send(err);
    res.status(201).json(result);
  });
};

//as a doctor i can update my information

const updateDetailsById = (req, res) => {
  const user_id = req.token.id;
  
  const {
    description,
    Qualifications,
    practicalExperiences,
    qualificationsFile,
    firstName,
    lastName,
    price,
    age,
    email,
    img,
  } = req.body;
  const query = `UPDATE doctorsDetails SET
  description=?, Qualifications=?,practicalExperiences=? , price= ? WHERE user_id=? `;
  const data = [description, Qualifications, practicalExperiences,price, user_id];

  db.query(query, data, (err, result) => {
    console.log(result);
    if (err) res.status(400).send(err);
    const query0 = `UPDATE users SET
    firstName=?, lastName=?,age=?,email=?,img=? WHERE id=? `;
    const data1 = [firstName, lastName, age, email, img, user_id];

    db.query(query0, data1, (err, result_1) => {
      if (err) res.status(400).send(err);
      const query1 = `SELECT users.firstName, users.lastName,users.age,users.email,users.img,doctorsDetails.price,
    doctorsDetails.Qualifications,doctorsDetails.practicalExperiences
    FROM users 
    INNER JOIN doctorsDetails ON users.id = doctorsDetails.user_id WHERE users.is_deleted =0 AND doctorsDetails.user_id = ? `;
      const data2 = [user_id];

      db.query(query1, data2, (err, result_2) => {
        if (err) res.status(400).send(err);
        
        res.status(200).json(result_2);
      });
    });
  });
};

//as a doctor, i can delete my details

const deleteDetailsById = (req, res) => {
  const user_id = req.token.id;
  const command = `UPDATE doctorsDetails SET
  is_deleted= 1 WHERE user_id=?`;
  const arr = [user_id];
  db.query(command, arr, (err, result) => {
    if (err) res.status(400).send(err);
    res.status(200).json(result);
  });
};

module.exports = {
  createDetails,
  updateDetailsById,
  deleteDetailsById,
  getDoctorProfile,
};
