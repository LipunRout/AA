const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const model = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  let { username, password, email, age } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      console.log(hash);
      let createdUser = await model.create({
        username,
        password: hash,
        email,
        age,
      });
      let token = jwt.sign({ email }, "shh");
      res.cookie("token", token);
      res.send(createdUser);
    });
  });
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  let user = await model.findOne({ email: req.body.email });
  console.log(user);
  if (!user) res.send("somthing is wrong");

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email:user.email }, "shh");
      res.cookie("token", token);
      res.send("login");
    }
    else res.send("somthing is wrong");
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

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
