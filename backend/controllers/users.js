const pool = require("../models/db");
const bcrypt = require("bcrypt");
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
    pool.query(query,values).then().catch()
}