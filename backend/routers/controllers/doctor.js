const db = require("./../../db/db");

// this function to get all doctors 
const getAllDoctors = (req, res) => {
  const query = `SELECT * FROM users WHERE role_id=2`;
  db.query(query, (err, result) => {
    if (err) res.status(404).send(err);
    res.status(200).json(result);
  });
};


const getDoctorById=(req,res)=>{
    const id=req.params.id
    const query=`SELECT * FROM users WHERE role_id=2 AND id=${id}`
    db.query(query, (err,result)=>{
        if(err) res.status(404).send(err);
        res.status(200).json(result);
    })
}


module.exports = {
  getAllDoctors,
  getDoctorById,
};
