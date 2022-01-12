const { json } = require('express');
const express = require('express')
const {OAuth2Client, GoogleAuth} = require('google-auth-library')
const PORT = process.env.PORT || 8080;
const app = express();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)
const cors = require('cors')


app.use(cors())
app.use(express.json());

app.post("/api/login", async function(req,res){
    const {token} = req.body

    const ticket = await client.verifyIdToken({
        idToken: token,

    })


    const {name,email,picture} = ticket.payload
    res.status(201)
    res.json({name, email, picture})
    

})

app.listen(PORT)