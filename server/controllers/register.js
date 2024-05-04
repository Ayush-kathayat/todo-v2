import User from '../models/users.js';

const register = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).send({ message: "Please provide all the required fields" });
    }

    // check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(409).json({ message: "User with the same email address already exists" });
    }

    const user = new User({ name, username, password });  // create a new user
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(409).json({error: error.message}); // Pass the error to the next middleware
  }
}

export default register;