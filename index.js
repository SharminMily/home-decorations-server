const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;


app.use(cors({
  origin: [
    'http://localhost:5173',
    // 'https://home-decorations-cde79.web.app'   
    'http://home-decorations.surge.sh'   
 
  ],
  credentials: true
}));

app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jzgy2jc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const servicesCollection = client.db("homeDecorations").collection("allServices")

    // allServices 

    app.get("/allServices", async (req, res) => {
        const result = await servicesCollection.find().toArray();
        res.send(result)
    })

    // id

    app.get("/allServices/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await servicesCollection.findOne(query);
      res.send(result)
  })



    // // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`)
})