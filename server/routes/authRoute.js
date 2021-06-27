const express = require('express')
const bcrypt = require('bcrypt');
const router = express.Router()
const authControl = require('../controller/authControl')
const validInfo = require('../middleware/validInfo')
const authorization = require('../middleware/authorization')


// Register Route 
router.post('/register',validInfo, async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const jwtToken = await authControl.doRegister(name, email, password)

        res.json({ jwtToken });
 
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})
 
// Login Route
router.post('/login',validInfo, async (req, res) => {
    const { email, password } = req.body
    try {

        const jwtToken = await authControl.doLogin(email, password)
        res.json({ jwtToken })

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

// verify on every instance of the task...

router.get("/is-verify",authorization, async (req, res) => {
    try {
        
        res.json(true)

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}) 


module.exports = router;


