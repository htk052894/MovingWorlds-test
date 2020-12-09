const cors = require("cors")
const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const bodyParser = require('body-parser')
const routes = require("./routes")
const app = express()

const dbURI = require("./config/keys").mongoURI

app.use(cors())

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// ============ PASSPORT SETUP ==============

app.use(passport.initialize())

// require passport config file

require("./config/passport")(passport)

app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongoDb connected"))
  .catch((err) => console.log(err))

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000
app.listen(port, () => console.log("server started"))
