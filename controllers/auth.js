const db = require("../model/db");
const jwt = require("jsonwebtoken");
exports.signUp = async (req, res) => {
  if (req.body) {
    let response;
    let status = 200;
    try {
      response = await db.signUp(req.body);
    } catch (e) {
      status = 400;
      response = "Something went wrong";
    } finally {
      if (typeof response !== "object") {
        console.log("hello")
        res.status(status).json(response);
      } else {
        const token = jwt.sign(
          JSON.stringify(response),
          process.env.COOKIE_TOKEN_SECRET
        );
        res
          .cookie("session_cookie", token, {
            maxAge: 60 * 60 * 24 * 5 * 1000,
          })
          .status(status)
          .json(response);
      }
    }
  } else {
    res.status(400);
  }
};
exports.logIn = async (req, res) => {
  console.log(req.body);
  if (req.body) {
    let response;
    let status = 200;
    try {
      response = await db.logIn(req.body);
    } catch (e) {
      status = 400;
      response = "Something went wrong";
    } finally {
      if (typeof response !== "object") {
        res.status(status).json(response);
      } else {
        const token = jwt.sign(
          JSON.stringify(response),
          process.env.COOKIE_TOKEN_SECRET
        );
        res
          .cookie("session_cookie", token, {
            maxAge: 60 * 60 * 24 * 5 * 1000,
          })
          .status(status)
          .json(response);
      }
    }
  } else {
    res.status(400);
  }
};
exports.onReload = async (req, res, next) => {
  if (req.cookies.session_cookie) {
    jwt.verify(
      req.cookies.session_cookie,
      process.env.COOKIE_TOKEN_SECRET,
      (err, data) => {
        if (err) {
          return res.status(403);
        } else {
          return res.status(200).json(data);
        }
      }
    );
  }
};

exports.updateUser = async (req, res) => {
  console.log(req.body)
  if (req.body) {
    let response;
    let status = 200;
    try {
      response = await db.updateUser(req.body);
    } catch (e) {
      status = 400;
      response = "Something went wrong";
    } finally {
      if(response !== null || typeof response !== "string"){
        const token = jwt.sign(
        JSON.stringify(response),
        process.env.COOKIE_TOKEN_SECRET
      );
      res
        .cookie("session_cookie", token, {
          maxAge: 60 * 60 * 24 * 5 * 1000,
        })
        .status(status);
      res
        .cookie("session_cookie", token, {
          maxAge: 60 * 60 * 24 * 5 * 1000,
        })
        .status(status)
        .json(response);
    }
      }
      
  } else {
    res.status(400);
  }
};
