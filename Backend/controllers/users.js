const User = require("../models/user");

const create = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const profileImage = req.body.profileImage;

  const user = new User({ name, email, password, profileImage });
  user
    .save()
    .then((user) => {
      console.log("User created, id:", user._id.toString());
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Email address is already taken") {
        // added if else statement for checking unique email
        res.status(400).json({ message: "Email address is already taken" });
      } else {
        res.status(400).json({ message: "Something went wrong" });
      }
    });
};

const getProfile = async (req, res) => {
  try {
    const profile = await User.findById(req.params.id); // add .populate when we have things to add to the profile page
    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorised" });
  }
};

const updateRecentlyPlayed = async (req, res) => {
  try {
    const recentlyPlayed = req.body.recentlyPlayed;

    const user = await User.findById(req.body.id);
    user.recentlyPlayed.push({ game: recentlyPlayed });
    console.log(user.recentlyPlayed);
    await user.save();
    return res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Failed to update recently played" });
  }
};

const UsersController = {
  create: create,
  getProfile: getProfile,
  updateRecentlyPlayed: updateRecentlyPlayed,
};

module.exports = UsersController;
