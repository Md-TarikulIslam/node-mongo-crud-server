const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
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
    const user ={
        name:'testing',
        email:'test@gmail.com'
    }
    const result = await personCollection.insertOne(user)
    console.log(result)
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
