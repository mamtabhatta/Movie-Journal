const express = require("express");
const passport = require("passport");
const connectDb = require("./config/db");
const movieRoutes = require("./routes/MovieRouter");
const authRoutes = require("./routes/AuthRouter");
const initializePassport = require("./config/passport");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

connectDb();

initializePassport(passport);

app.use(express.json());

app.use(passport.initialize());

app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
