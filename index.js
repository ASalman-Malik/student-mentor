import express, { request, response } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT;
const MONGO_DB = process.env.MONGODB;


export async function createDBConnection(){
    const client = new MongoClient(MONGO_DB);
    await client.connect();
    console.log("Coonected to MONGO DB ATLAS");
    return client;
} 

app.get("/", (request, response) => {
    response.send("Welcome here we will be establishing connection with MONGODB ATLAS with Student-Mentor-API-DB");
})


app.post("/add-student", async(request, response) => {
    const studentData= request.body;
    console.log(studentData);
    const client = await createDBConnection();
    const result = await client
    .db("student-mentor")
    .collection("student")
    .insertOne(request.body);
    response.send(result);
})

app.get("/get-students", async(request, request) => {
    const client = await createDBConnection();
    const result = await client
    .db("student-mentor")
    .collection("student")
    .find({})
    .toArray();
    response.send(result);
})

app.post("/add-mentor", async(request, response) => {
    const mentorData = request.body;
    console.log(mentorData);
    const client = await createDBConnection();
    const result = await client
    .db("student-mentor")
    .collection("mentor")
    .insertOne(request.body);
    response.send(result);
})
app.get("/get-mentors", async(request, response) => {
    const client = await createDBConnection();
    const result = await client
    .db("student-mentor")
    .collection("student")
    .find({})
    .toArray();
    response.send(result);
})

app.get("/student-with-no-mentor", async(request, response) => {
    const client = await createDBConnection();
    const result = await client
    .db("student-mentor")
    .collection("student")
    .find({mentor: ""})
    .toArray();
    response.send(result);
})


app.put("/one-mentor-many-student-assign", async(request, response) =>{
    const mentorData = request.body;
    const data = mentorData.data;
    const nmentor = mentorData.mentor;
    const omdata = data.map((id) => ObjectId(id));
    const client = await createDBConnection();
    const result = await client
    .db("student-mentor")
    .collection("student")
    .updateMany({_id : {$in : omdata }}, {$set : { mentor : nmentor}})
    response.send(result);
})

app.get("/students-for-mentor", async(request, response) => {
    const mentorData = request.body;
    const client = await createDBConnection();
    const result = await client
    .db("student-mentor")
    .collection("student")
    .find({mentor : mentorData})
    .toArray();
    response.send(result);
})


app.listen(port, () => console.log("The server is started at : ", port));