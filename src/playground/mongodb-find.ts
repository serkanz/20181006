import { MongoClient, ObjectID } from "mongodb";
import { agent } from "supertest";


async function connect() {
    // let conn = await MongoClient.connect("mongodb://localhost:27017/TodoApp");
    let client;
    try {
        // Use connect method to connect to the Server
        client = await MongoClient.connect("mongodb://localhost:27017/TodoApp");

        const db = client.db("TodoApp");

        try {

            type person = { name: string, age: number, location: string, _id: ObjectID };

            const result: person[] = await db.collection("User").find().toArray();

            result.forEach(element => {
                console.log(element._id.getTimestamp());
            });

        } catch (error) {
            console.log(error);
        }

    } catch (err) {
        console.log(err.stack);
    }

    if (client) {
        console.log(client.isConnected());
        client.close();
        console.log(client.isConnected());
    }
}

connect();