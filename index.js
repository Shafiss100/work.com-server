const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const app = express()
const port = 5000;


// user: workdotcom
// pass: FtkofczY89JKTPHC

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// this is from mongodb 
const uri = "mongodb+srv://workdotcom:FtkofczY89JKTPHC@cluster0.ppgea.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     client.close();
// });

async function run() {
    try {
        const userCollection = client.db("userCollection").collection("users")
        // create a document to insert
        const doc = {
            title: "Record of a Shriveled Datum",
            content: "No bytes, no problem. Just insert a document, in MongoDB",
        }
        const result = await haiku.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


