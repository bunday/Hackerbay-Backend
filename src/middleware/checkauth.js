const jwt = require("jsonwebtoken");
const jwtPasscode = process.env.JWT_TOKEN;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token,jwtPasscode);
    next();
  }catch(err) {
    res.status(401).json({message:'Unauthorized!'})
  }

};
