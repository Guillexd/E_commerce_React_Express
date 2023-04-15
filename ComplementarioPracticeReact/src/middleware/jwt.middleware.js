import obj from "../config.js";
import jwt from "jsonwebtoken";

export const jwtValid = (req, res, next) => {
  //we also can use signedCookie instead of a normal cookie, if cookie was modified return false, this cookie is in server.js and user.controller
  //this is similar using Strategies like passport jwt
  
  try {
    if(!req.cookies.tokenJwt) return res.json({ state: 0, err: 'jwt invalid'});
    const isValid = jwt.verify(req.cookies.tokenJwt, obj.secret_key_jwt);
    if(isValid) next();
    else res.json({ state: 0, err: 'jwt invalid'});
  } catch (err) {
    res.json({ state: 0, err: 'jwt invalid'});
  }
}