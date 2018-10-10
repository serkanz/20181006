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

            // const result: person[] = await db.collection("User").find().toArray();

            // result.forEach(element => {
            //     console.log(element._id.getTimestamp());
            // });

            // let result = await db.collection("User").deleteMany({ age: 39 });

            // console.log(result.result.ok);

            const result = await db.collection("User").deleteOne({ ObjectID: ObjectID.createFromHexString("5bbe3a14d5cef022f8c77033") });

            console.log(result.result.ok);

            const res = await db.collection("User").findOneAndDelete({ age: 39 });

            if (res.ok) {
                const person: person = res.value;

                console.log(JSON.stringify(person));
            }
            //console.log(result.length);

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