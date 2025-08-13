const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden: Admin only" });
    }
    next();
  };
};

module.exports = authorizeRole;
