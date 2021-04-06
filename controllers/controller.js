const db = require("../model/db");

exports.nearby = async (req, res) => {
  const { i, long, latt } = req.query;
  let status = 400;
  let result;
  if (i && long & latt) {
    try {
      result = await db.getUsersNearBy(i, [long, latt]);
      status = 200;
    } catch (err) {
      result = "Something went wrong";
      console.log(err);
    } finally {
      res.status(status).json(result);
    }
  } else {
    res.status(400);
  }
};

exports.leave = async (req, res) => {
  console.log(req.body)
  if (req.body) {
    let result;
    let status;
    try {
      result = await db.logOut(req.body.id);
      status = 200;
    } catch (err) {
      result = "Something went terribly wrong";
      status = 400;
    } finally {
      if (typeof result === "string") {
        res.status(status).json(result);
      } else {
        res.clearCookie("auth_cookie",{domain: "localhost", path:"/"})
        res.sendStatus(200);
      }
    }
  } else {
    res.status(200).json("Yo ya no sé");
  }
};
