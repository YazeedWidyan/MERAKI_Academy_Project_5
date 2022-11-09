const {pool} = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.SALT);
 
const register =async (req,res)=>{
    const { firstName, lastName, age, country, email, password, role_id}=req.body;
    const enPassword = await bcrypt.hash(password,saltRounds);
    const values = [
        firstName,
        lastName,
        age,
        country,
        email.toLowerCase(),
        enPassword,
        role_id,
      ];

    const query=`INSERT INTO users (firstName, lastName, age, country, email, password, role_id) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
    pool.query(query,values).then((result) => {
        res.status(200).json({
          success: true,
          massage: "Account Created Successfully",
        });
      })
      .catch((err) => {
        res.status(409).json({
          success: false,
          massage: "The email already exists",
          err,
        });
      })
}
const googleRegister =async (req,res)=>{
  console.log(req.body);
  const { firstName, lastName, email,}=req.body;
  const password=123
  //  const enPassword = await bcrypt.hash(password,saltRounds);
  const values = [
      firstName,
      lastName,
      33,
      "jordan",
      email.toLowerCase(),
      123,
      1
    ];

  const query=`INSERT INTO users (firstName, lastName, age, country, email, password, role_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`;
  pool.query(query,values).then((result) => {
    console.log(result);
    const payload = {
      userId: result.rows[0].id,
      country: result.rows[0].country,
      role: result.rows[0].role_id,
    };
    const options = { expiresIn: "1d" };
    const secret = process.env.SECRET;
    const token = jwt.sign(payload, secret, options);
    res.status(201).json({
      userId: result.rows[0].id,
      token,
      role:result.rows[0].role_id,
      

    })
  })
   
    .catch((err) => {
      console.log(err);
      res.status(409).json({
        success: false,
        massage: "The email already exists",
        err,
      });
    })
}

module.exports = {
    register,googleRegister
  };
  