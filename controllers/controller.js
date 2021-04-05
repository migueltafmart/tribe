const db = require("../model/db");
const jwt = require("jsonwebtoken");

exports.logOut = (req, res) =>{
    res.status(200).clearCookie("auth_cookie")
}