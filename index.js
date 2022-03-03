const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const port = process.env.PORT || 5000;

// configure dotenv
require("dotenv").config();

app.use(cors());
app.use(express.json());

// connect to mongodb

const uri = `mongodb+srv://${process.env.S3_BUCKET}:${process.env.SECRET_KEY}@cluster0.tvvz8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("food_delivery");
    const productCollection = database.collection("products");
    const orderCollection = database.collection("orders");

    // get single api system

    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.findOne(query);
      console.log(result);
      res.send(result);
    });

    // get api system

    app.get("/products", async (req, res) => {
      const cursor = productCollection.find({});
      const result = await cursor.toArray();

      res.send(result);
    });

    // post api system

    app.post("/products", async (req, res) => {
      const products = req.body;
      const results = await productCollection.insertOne(products);

      res.json(results);
    });

    // add order post api system

    app.post("/orders", async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.json(result);
      console.log(result);
    });

    console.log("connect to database int hitting");
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/hero", (req, res) => {
  res.send("This is heroku demo");
});

app.get("/", (req, res) => {
  res.send("Hello food delivery");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
