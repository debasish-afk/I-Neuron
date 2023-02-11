const express = require("express");
const mongoose = require("mongoose");
const userRouter=require("./routes/userRoute")

const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://Debasish904:Nzi5BjnfyWQmSY9m@cluster0.eeozuz6.mongodb.net/iNeuron",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

app.use("/api/user",userRouter)

const PORT=3000
  app.listen(PORT,()=>console.log(`Server is connected to ${PORT}`))
