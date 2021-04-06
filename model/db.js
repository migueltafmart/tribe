const mongoose = require("mongoose"),
  crypto = require("crypto");

mongoose
  .connect(decodeURIComponent(process.env.ENCODED_URI), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Database running"))
  .catch((err) => console.error("Something went wrong", err));

const userSchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  age: { type: String, required: true },
  gender: String,
  location: {
    type: { type: String, enum: "Point", required: true },
    coordinates: { type: [Number], required: true },
  },
  socket: { type: String, default: null },
  locationHistory: Array,
  socketHistory: Array,
  room: { type: String, default: null },
  email: { type: String, unique: true, required: true, dropDups: true },
  hashPwd: { type: String, required: true },
  strikes: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now() },
  color: { type: String, default: "black" },
});
userSchema.index({ location: "2dsphere" });

const User = mongoose.model("User", userSchema);

exports.signUp = async ({ displayName, age, gender, location, email, pwd }) => {
  if (
    (displayName.length > 0 &&
      age > 18 &&
      gender.length > 0 &&
      location &&
      email.length > 0,
    pwd.length > 0)
  ) {
    const user = new User({
      displayName: displayName,
      age: age,
      gender: gender,
      location: location,
      email: email,
      hashPwd: crypto.createHash("md5").update(pwd).digest("hex"),
    });
    return await user.save();
  } else {
    return {};
  }
};

exports.logIn = async ({ email, pwd }) => {
  if (email.length > 0 && pwd.length > 0) {
    const user = await User.findOne({ email: email });
    if (user.hashPwd === crypto.createHash("md5").update(pwd).digest("hex")) {
      return {
        _id: user._id,
        location: user.location,
        socket: user.socket,
        strikes: user.strikes,
        lastUpdated: user.lastUpdated,
        color: user.color,
      };
    } else {
      return "Wrong email or password";
    }
  } else {
    return null;
  }
};

exports.updateUser = async (method, { _id, socket, location, color }) => {
  switch (method) {
    case "location":
      if (_id.length > 0 && location) {
        const user = await User.findById(_id);
        await User.findByIdAndUpdate(_id, {
          lastUpdated: Date.now(),
          location: location,
          locationHistory: [
            ...Array.from(
              new Set(user.locationHistory.map(JSON.stringify)),
              JSON.parse
            ),
            location,
          ],
        });
        return {
          _id: user._id,
          location: location,
          socket: user.socket,
          strikes: user.strikes,
          lastUpdated: user.lastUpdated,
          color: user.color,
        };
      }
    case "socket":
      if (_id.length > 0 && socket) {
        const user = await User.findById(_id);
        await User.findByIdAndUpdate(_id, {
          lastUpdated: Date.now(),
          socket: socket,
          socketHistory: [
            ...user.socketHistory.filter((e, i, a) => a.indexOf(e) === i),
            socket,
          ],
        });
        return {
          _id: user._id,
          location: user.location,
          socket: socket,
          strikes: user.strikes,
          lastUpdated: user.lastUpdated,
          color: user.color,
        };
      }
    case "color":
      if (_id.length > 0 && color) {
        const user = await User.findById(_id);
        await User.findByIdAndUpdate(_id, {
          lastUpdated: Date.now(),
          color: color,
        });
        return {
          _id: user._id,
          location: user.location,
          socket: user.socket,
          strikes: user.strikes,
          lastUpdated: user.lastUpdated,
          color: color,
        };
      }
    default:
      return null;
  }
};

exports.getUsersNearBy = async (_id, location) => {
  const result = await User.find({
    _id: { $ne: _id },
    location: {
      $near: {
        $maxDistance: 100,
        $geometry: {
          type: "Point",
          coordinates: location,
        },
      },
    },
  });
  return result.map((user) => {
    return {
      user: { socket: user.socket, id: user._id },
      location: user.location,
      color: user.color,
    };
  });
};

exports.logOut = async (_id) => {
  const result = await User.findByIdAndUpdate(_id, {
    socket: null,
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
    color: "black",
  });
  return result;
};
