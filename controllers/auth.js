const login = async (req, res) => {
  res.json({ msg: "login successful" });
};

const register = async (req, res) => {
  res.json({ msg: "registration successful" });
};

module.exports = {
  login,
  register
};
