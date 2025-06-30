const express = require("express");
const connectDb = require("./config/db"); 
const movieRoutes=require("./routes/movieRouter");
const authRoutes=require("./routes/authRouter");
const app = express();
app.use(express.json());
app.use('/api/movies',movieRoutes);
app.use('/api/auth',authRoutes);

require("dotenv").config();

const PORT = 8000;

connectDb();  

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });



