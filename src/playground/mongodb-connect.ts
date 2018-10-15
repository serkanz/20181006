import { MongoClient } from "mongodb";


async function connect() {
    // let conn = await MongoClient.connect("mongodb://localhost:27017/TodoApp");
    let client;
    try {
        // Use connect method to connect to the Server
        client = await MongoClient.connect("mongodb://localhost:27017/TodoApp");

        const db = client.db("TodoApp");

        // try {
        //     const result = await db.collection("Todos").insertOne({ text: "serkan", completed: false });

        //     console.log(JSON.stringify(result.ops, undefined, 2));

        // } catch (err) {
        //     console.log(err);
        // }

        try {
            const result = await db.collection("User").insertOne({ name: "Serkan", age: 39, location: "Ankara" });

            // console.log(result.ops[0]._id.getType());
            console.log(result.ops[0]._id.getTimestamp());
        } catch (error) {
            console.log(error);
        }

    } catch (err) {
        console.log(err.stack);
    }

    if (client) {
        console.log(client.isConnected());
        client.close();
    }
}

connect();