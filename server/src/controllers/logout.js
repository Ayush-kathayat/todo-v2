// In your authController.js file
const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.clearCookie("connect.sid").json({ message: "Logged out"});
  });
};

export default logout;
