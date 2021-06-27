const jwtGenerator = require('../utils/jwtGenerator')
const bcrypt = require('bcrypt');
const pool = require('../src/pool');


class authControl {
    
    
    static async doRegister(name, email, password){

        // get the name, email, password
        // check if the user is present or not
        // Bcrypt the user password
        // enter the new user in the database
        // generate the JWT token

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        if (user.rows.length > 0) {
            return res.status(401).json("User already exist!");
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        let newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
        );

        const jwtToken = jwtGenerator(newUser.rows[0].user_id);
        
        return jwtToken
    }

    static async doLogin(email, password) {
        // get the value from the client
        // check if user doesnt exist (if exist throw an error)
        // Check if client password is same as DATABASE password
        // give them jwt token

        
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1;",[email])

        // if user does not exist
        if(user.rows.length === 0){
            return res.status(401).json('Password for email is incorrect')
        }

        // check the bcrypt password and the password in database
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)

        if(!validPassword){
            return res.status(401).json("Password Or Email is Incorrect")
        }

        const jwtToken = jwtGenerator(user.rows[0].user_id)

        return jwtToken
    }

}

module.exports = authControl


