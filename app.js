const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
// const bcrypt = require("bcrypt");
// const token = require("jsonwebtoken");



app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());


app.get("/",(req,res)=>{
  res.render('index');
})







// app.get("/", (req, res) => {
//   res.cookie("lipun", "Sr. Eng");
//   console.log(req.cookies);
//   res.send("Set");
// });

// app.get("/bcrypt", (req, res) => {
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash("Lipun", salt, (err, hash) => {
//       console.log(hash);
//       res.send("Okkk");
//     });
//   });
// });

// app.get("/compare", (req, res) => {
//   bcrypt.compare(
//     "Lipun",
//     "$2b$10$Wyz1XEBJv8xUF6ojlYuPJOJbIlcw49GoE6HLkLdhecZXilom1m.iO",
//     (err, resuly) => {
//       if (err) {
//         console.log(err);
//         res.send("Error");
//       } else {
//         res.send(resuly);
//         console.log(resuly);
//       }
//     }
//   );
// });

app.listen(3000, () => {
  console.log("rrrrrrr....");
});
