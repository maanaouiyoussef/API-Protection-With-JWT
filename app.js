const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()


app.get('/api', (req,res) => {
    res.json({
        message: 'API access authorized !'
    })
})

app.post('/api/posts',verifyToken, (req,res) => {
     jwt.verify(req.token,'secretKey', (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'Post Created !', 
                authData
            })
        }
     })

     res.json({
         token: req.token
     })
    
})

app.post('/api/login', (req,res) => {
    // Beck user 
    const user = {
        id: 1, 
        username: "youssefmaanaoui", 
        email: "sefrou1516@gmail.com"
    }

    jwt.sign({user},'secretKey', (err, token) => {
      
            res.json({
                message: 'Token : ' + token
            })
     
    })
})

// Middelware 
function verifyToken(req,res,next) {
    // headers is like Bearer <token>
    const bearer = req.headers['Authorization']
    
    if(typeof bearer !== 'undefined') {
        const bearerArr = bearer.split(' ')
        const bearerToken = bearerArr[1]

        req.token = bearerToken
    } else {
        res.sendStatus(403)
    }

    next()
}

app.get('/',(req,res)=>{
    res.json({message: 'Welcome to the backend'})
 })


app.listen(5000,() => console.log('Server running on the port 5000'))