const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
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
        
        app.post('/user', async(req, res) => {
            const user = req.body;
            const query = {email : user.email}
            const filter = await userCollection.findOne(query );
            if(!filter){
                const result = await userCollection.insertOne(user);
                res.send(result);
            }
            else{
                res.send("success")
            }
            
        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


