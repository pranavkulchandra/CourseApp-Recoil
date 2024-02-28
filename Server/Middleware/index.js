
const jwt = require("jsonwebtoken");
require("dotenv").config()
const SECRET = process.env.SECRET

const authenticateJwt = (req, res, next) => { 
    const authHeader = req.headers.authorization; 
    console.log(authHeader);
    if ( authHeader ) { 
        const token = authHeader.split(" ")[1]
        jwt.verify(token, SECRET, (err, user) => { 
            if (err) { 
                res.status(401).json({"Message" : "Token Error"})
            } else{ 
                req.user = user; 
                next()
            }
        });

        
    } else { 
        res.status(402).json({ Message : "No AuthHeader"})
    }
}

module.exports=(authenticateJwt)
