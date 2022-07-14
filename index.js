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
        // user get and insert
        app.get('/user', async(req, res) => {
            const email = req.query.email;
            console.log(email)
            const query = {email: email}
            // const corsor = userCollection.findOne(query)?
            const result =  await userCollection.findOne(query);
            console.log(result)
            res.send(result)
        })
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

        // user profile update 
        app.patch('/ulocation', async (req, res) => {
            const userLocation = req.body.userLocation
            const userEmail = req.body.userEmail
            const filter = {email: userEmail}
            const option = {upsert : true};
            const updateDoc = {
                $set: {
                    userLocation: userLocation,
                }
            }
            const result = await userCollection.updateOne(filter, updateDoc, option)
            res.send({message: "success"})
        })
        app.patch('/ueducation', async (req, res) => {
            const userEducation = req.body.userEducation
            const userEmail = req.body.userEmail
            const filter = {email: userEmail}
            const option = {upsert : true};
            const updateDoc = {
                $set: {
                    userEducation: userEducation,
                }
            }
            const result = await userCollection.updateOne(filter, updateDoc, option)
            res.send({message: "success"})
        })
        app.patch('/uexperience', async (req, res) => {
            const userExperience = req.body.userExperience
            const userEmail = req.body.userEmail
            const filter = {email: userEmail}
            const option = {upsert : true};
            const updateDoc = {
                $set: {
                    userExperience: userExperience,
                }
            }
            const result = await userCollection.updateOne(filter, updateDoc, option)
            res.send({message: "success"})
        })
        app.patch('/uexpart', async (req, res) => {
            const userExpart = req.body.userExpart
            const userEmail = req.body.userEmail
            const filter = {email: userEmail}
            const option = {upsert : true};
            const updateDoc = {
                $set: {
                    userExpart: userExpart,
                }
            }
            const result = await userCollection.updateOne(filter, updateDoc, option)
            res.send({message: "success"})
        })


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


