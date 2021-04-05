const mongoose = require("mongoose"),
  crypto = require("crypto");

mongoose
  .connect(decodeURIComponent(process.env.ENCODED_URI), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Database ready."))
  .catch((err) => console.error("Something went wrong", err));

const pointSchema = new mongoose.Schema({
  
});

const userSchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  age: { type: String, required: true },
  gender: String,
  location: {
    type: {
      type: String,
      enum: ["Feature"],
      required: true,
    },
    geometry: {type: { type: String, enum: "Point", required: true },
    coordinates: { type: [Number], required: true },},
    properties: { color: { type: String } },
  },
  socket: { type: String, default: null },
  locationHistory: Array,
  socketHistory: Array,
  room: { type: String, default: null },
  email: { type: String, unique: true, required: true, dropDups: true },
  hashPwd: { type: String, required: true },
  strikes: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now() },
});
const User = mongoose.model("User", userSchema);

exports.signUp = async ({ displayName, age, gender, location, email, pwd }) => {
  console.log(displayName, age, gender, location, email, pwd);
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
      return user;
    } else {
      return "Wrong email or password";
    }
  } else {
    return null;
  }
};
exports.updateUser = async ({ _id, socket, location }) => {
  if (_id.length > 0 && socket.length > 0 && location) {
    try {
      const user = await User.findById(_id);
      const result = await User.findByIdAndUpdate(_id, {
        socket: socket,
        location: location,
        socketHistory: [
          ...user.socketHistory.filter((e, i, a) => a.indexOf(e) === i),
          socket,
        ],
        locationHistory: [
          ...Array.from(
            new Set(user.locationHistory.map(JSON.stringify)),
            JSON.parse
          ),
          location,
        ],
      });
      console.log(result)
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  } else {
    return null;
  }
};

exports.getUsersNearBy = async (_id, location) => {
  User.find({
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
  }).find((error, results) => {
    if (error) console.log(error);
    console.log(JSON.stringify(results, 0, 2));
  });
};
