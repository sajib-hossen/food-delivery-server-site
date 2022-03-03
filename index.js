const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

// configure dotenv
require("dotenv").config();

app.use(cors());
app.use(express.json());

// connect to mongodb

const uri = `mongodb+srv://<username>:<password>@cluster0.tvvz8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.get("/", (req, res) => {
  res.send("Hello food delivery");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
