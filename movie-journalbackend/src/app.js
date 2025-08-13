const express = require("express");
const passport = require("passport");
const connectDb = require("./config/db");
const movieRoutes = require("./routes/MovieRouter");
const authRoutes = require("./routes/AuthRouter");
const watchlistRoutes = require("./routes/watchListRoute");
const reviewRoutes = require("./routes/reviewRoute");
const searchRoutes = require("./routes/searchRouter")
const initializePassport = require("./config/passport");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

connectDb();

initializePassport(passport);

app.use(express.json());

app.use(passport.initialize());

app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/review", reviewRoutes);
app.use("api/search", searchRoutes);

 PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
