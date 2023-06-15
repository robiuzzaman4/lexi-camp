const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

// middlewere
app.use(cors());
app.use(express.json());

const verifyJwt = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error: true, message: "unauthorized access!" });
    }

    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: true, message: "unauthorized access!" });
        }

        req.decoded = decoded;
        next();
    })
}


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wjbyitu.mongodb.net/?retryWrites=true&w=majority`;


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

        const userCollection = client.db("lexiCampDB").collection("users");
        const classCollection = client.db("lexiCampDB").collection("classes");
        const selectedClassCollection = client.db("lexiCampDB").collection("selectedClasses");
        const paymentCollection = client.db("lexiCampDB").collection("payments");


        // jwt
        app.post("/jwt", (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '1h' });
            res.send({ token });
        })

        // verify admin
        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            if (user?.role !== "admin") {
                return res.status(403).send({ error: true, message: "forbidden access" });
            }
            next();
        }

        // verify instructor
        const verifyInstructor = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            if (user?.role !== "instructor") {
                return res.status(403).send({ error: true, message: "forbidden access" });
            }
            next();
        }

        // verify student 
        const verifyStudent = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            if (user?.role !== "student") {
                return res.status(403).send({ error: true, message: "forbidden access" });
            }
            next();
        }

        // ----- students / users related api's -----

        // find student
        app.get("/users/student/:email", verifyJwt, async (req, res) => {
            const email = req.params.email;
            if (req.decoded.email !== email) {
                res.send({ student: false })
            }
            const query = { email: email };
            const user = await userCollection.findOne(query);
            const result = { student: user?.role === "student" };
            res.send(result);
        })

        // get all users
        app.get("/users", async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result);
        })

        // save users
        app.post("/users", async (req, res) => {
            const user = req.body;
            const query = { email: user.email };
            const existingUser = await userCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: "user already exist" });
            }
            const result = await userCollection.insertOne(user);
            res.send(result);
        })

        // add to enroll a class
        app.post("/users/my-selected-classes/:email", verifyJwt, async (req, res) => {
            const selectedClass = req.body;
            const email = req.params.email;
            const classId = selectedClass.classId

            const query = { classId: classId, studentEmail: email };

            const existingClass = await selectedClassCollection.findOne(query);

            if (existingClass) {
                return res.send({ message: "You can't enroll multiple time in one class!" });
            }

            const result = await selectedClassCollection.insertOne(selectedClass);
            res.send(result);
        })

        // get all selected classes
        app.get("/users/my-selected-classes/:email", verifyJwt, verifyStudent, async (req, res) => {
            const email = req.params.email;
            const query = { studentEmail: email, paymentStatus: "pending" };
            const result = await selectedClassCollection.find(query).toArray();
            res.send(result);
        })

        // delete a selected class
        app.delete("/users/my-selected-classes/:id/:email", verifyJwt, verifyStudent, async (req, res) => {
            const id = req.params.id;
            const email = req.params.email;
            const query = { _id: new ObjectId(id), studentEmail: email, paymentStatus: "pending" };
            const result = await selectedClassCollection.deleteOne(query);
            res.send(result);
        })

        // get all enrolled classes
        app.get("/users/my-enrolled-classes/:email", verifyJwt, verifyStudent, async (req, res) => {
            const email = req.params.email;
            const query = { studentEmail: email, paymentStatus: "succeed" };
            const result = await selectedClassCollection.find(query).toArray();
            res.send(result);
        })

        // update selected class payment status after payment
        app.patch("/users/my-selected-classes/:email", verifyJwt, verifyStudent, async (req, res) => {
            const email = req.params.email;
            const query = { studentEmail: email, paymentStatus: "pending" };
            const updatedDoc = {
                $set: {
                    paymentStatus: "succeed"
                }
            }
            const result = await selectedClassCollection.updateOne(query, updatedDoc);
            res.send(result);
        })

        // ----- admin related api's -----

        // find admin
        app.get("/users/admin/:email", verifyJwt, async (req, res) => {
            const email = req.params.email;
            if (req.decoded.email !== email) {
                res.send({ admin: false })
            }
            const query = { email: email };
            const user = await userCollection.findOne(query);
            const result = { admin: user?.role === "admin" };
            res.send(result);
        })

        // get all classes data on admin dashboard
        app.get("/admin/manage-classes", verifyJwt, verifyAdmin, async (req, res) => {
            const result = await classCollection.find().toArray();
            res.send(result);
        })

        // approve a class
        app.patch("/admin/manage-classes/approved/:id", verifyJwt, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    status: "approved"
                }
            }
            const result = await classCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

        // deny a class
        app.patch("/admin/manage-classes/denied/:id", verifyJwt, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    status: "denied"
                }
            }
            const result = await classCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

        // get all user for mange role
        app.get("/admin/manage-users", verifyJwt, verifyAdmin, async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result);
        })

        // make instructor
        app.patch("/admin/manage-users/make-instructor/:email", verifyJwt, verifyAdmin, async (req, res) => {
            const email = req.params.email;
            const filter = { email: email };
            const updatedDoc = {
                $set: {
                    role: "instructor"
                }
            }
            const result = await userCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

        app.get("/instructors", async (req, res) => {
            const query = { role: "instructor" };
            const result = await userCollection.find(query).toArray();
            res.send(result);
        })

        // make admin
        app.patch("/admin/manage-users/make-admin/:email", verifyJwt, verifyAdmin, async (req, res) => {
            const email = req.params.email;
            const filter = { email: email };
            const updatedDoc = {
                $set: {
                    role: "admin"
                }
            }
            const result = await userCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

        // give feedback
        app.patch("/admin/manage-classes/give-feedback/:id/:email", verifyJwt, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const email = req.params.email;
            const feedback = req.body;
            const filter = { _id: new ObjectId(id), instructorEmail: email };
            const updatedDoc = {
                $set: {
                    feedback: feedback.feedbackMessage
                }
            }
            const result = await classCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })


        // ----- instructor related api's -----

        // find instructor 
        app.get("/users/instructor/:email", verifyJwt, async (req, res) => {
            const email = req.params.email;
            if (req.decoded.email !== email) {
                res.send({ instructor: false })
            }
            const query = { email: email };
            const user = await userCollection.findOne(query);
            const result = { instructor: user?.role === "instructor" };
            res.send(result);
        })

        // add a class
        app.post("/instructor/add-classes", verifyJwt, verifyInstructor, async (req, res) => {
            const newClass = req.body;
            const result = await classCollection.insertOne(newClass);
            res.send(result);
        })

        // find single instrcutor all classes
        app.get("/instructor/my-classes/:email", verifyJwt, verifyInstructor, async (req, res) => {
            const email = req.params.email;
            const query = { instructorEmail: email };
            const result = await classCollection.find(query).toArray();
            res.send(result);
        })

        // classes -------------
        app.get("/allApproved-classes", async (req, res) => {
            const query = { status: "approved" };
            const result = await classCollection.find(query).toArray();
            res.send(result);
        })

        // get top classes
        app.get("/top-classes", async (req, res) => {
            const query = { status: "approved" };
            const result = (await classCollection.find(query).sort({ totalStudent: -1 }).toArray()).slice(0, 6);
            res.send(result);
        })

        // update classes seats and students after payment
        app.put("/users/update-class/:id", verifyJwt, verifyStudent, async (req, res) => {
            const updatedClassInfo = req.body;
            const id = req.params.id;
            // console.log("update from class db", id, updatedClassInfo);
            const query = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    availableSeats: parseInt(updatedClassInfo.availableSeats),
                    totalStudent: parseInt(updatedClassInfo.totalStudent)
                }
            }
            const result = await classCollection.updateOne(query, updatedDoc);
            res.send(result);
        })

        // update seleted classes seats and students after payment
        app.put("/users/update-my-selectedClass/:id", verifyJwt, verifyStudent, async (req, res) => {
            const updatedClassInfo = req.body;
            const id = req.params.id;
            // console.log("update from selected db", id, updatedClassInfo);
            const query = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    availableSeats: parseInt(updatedClassInfo.availableSeats),
                    totalStudent: parseInt(updatedClassInfo.totalStudent)
                }
            }
            const result = await selectedClassCollection.updateOne(query, updatedDoc);
            res.send(result);
        })


        // payment -stripe
        app.post("/create-payment-intent", verifyJwt, verifyStudent, async (req, res) => {
            const { price } = req.body;
            const amount = Number(price * 100);
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: "usd",
                payment_method_types: [
                    "card"
                ],
            })
            res.send({
                clientSecret: paymentIntent.client_secret
            });
        })

        // save payment history
        app.post("/payments", verifyJwt, verifyStudent, async (req, res) => {
            const payment = req.body;
            const result = await paymentCollection.insertOne(payment);
            res.send(result);
        })

        // gate payment history
        app.get("/users/payments-history/:email", verifyJwt, verifyStudent, async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const options = {
                sort: { createdAt: -1 }
            }
            const result = await paymentCollection.find(query, options).toArray();
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Lexi Camp server is running!");
})

app.listen(port, () => {
    console.log(`Lexi Camp server is running on port: ${port}`);
})
