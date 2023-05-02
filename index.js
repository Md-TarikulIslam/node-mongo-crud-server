const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// pass VKMSM3g0Qpz9hjpj

const uri =
  "mongodb+srv://dbuser2:VKMSM3g0Qpz9hjpj@cluster0.c0hninn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const personCollection = client.db("nodeMongoCrud").collection("person");

    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = personCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await personCollection.findOne(query);
      res.send(user);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await personCollection.insertOne(user);
      res.send(result);
    });

    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const user = req.body;
      const option = { upsert: true };
      const updateUser = {
        $set: {
          name: user.name,
          address: user.address,
          email: user.email,
        },
      };
      const result = await personCollection.updateOne(filter, updateUser, option);
      res.send(result);

      console.log(user);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("Trying to delete", id);
      const query = { _id: new ObjectId(id) };
      const result = await personCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("hello from node mongo server");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
