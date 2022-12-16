const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const cors=require("cors");
dotenv.config();
const PORT=process.env.PORT;
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
app.use(express.json());
app.use(cors());
app.use('/images',express.static(path.join(process.cwd(), "/images")));
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("connection is set ");

}).catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/Api/upload", upload.single("file"),
  (req, res) => {
    res.status(200).json("File has been uploaded");
  });
app.use("/Api/auth", authRoute);
app.use("/Api/user", userRoute);
app.use("/Api/posts", postRoute);
app.use("/Api/categories", categoryRoute);
app.listen(5000 || process.env.PORT,() => {
  console.log(PORT);
  console.log("listening to port")
})

