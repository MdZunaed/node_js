const { MongoClient } = require("mongodb");


const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Successfully connected to Atlas");
        var dbo = client.db("school");

        var myobj = { name: "Zunayed", roll: 450197, address: "Dhaka" };
        await dbo.collection("students").insertOne(myobj, function (err, res) {
            if (err) {
                console.error("Insert error: ", err);
                throw err;
            }

            console.log("1 document inserted");
            client.close();
        });

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);