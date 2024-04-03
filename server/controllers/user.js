export const profile = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return res.status(200).json({ ...req.user.toObject() , loggedIn: true });
    } else {
      return next({ message: "Unauthorized", status: 401 });
    }
  } catch (err) {
    return next(err);
  }
};
