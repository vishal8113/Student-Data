const { getUser } = require("../services/auth");
exports.restrictUser = async (req, res, next) => {
  const id = req.cookies?.uid;

  if (!id) {
    res.status(402).send("Unauthorized");
    return;
  }

  const user = getUser(id);
  console.log(user);

  if (!user) {
    res.status(402).send("Unauthorized");
    return;
  }

  req.user = user;
  next();
};
exports.checkAuth = async (req, res, next) => {
  const id = req.cookies?.uid;

  const user = getUser(id);

  req.user = user;
  next();
};
