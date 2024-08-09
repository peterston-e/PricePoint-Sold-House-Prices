import { MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// temp hard coded postcode
// const postcode = "BN1 8AB";

export default async function searchPostcode(x_postcode) {
	console.log(`searchPostcode called with postcode: ${x_postcode}`); // for debugging
	// Connection URI and client creation
	const uri = process.env.MONGODB_URI;
	const client = new MongoClient(uri);
	console.log(`uri: ${uri}`); // for debugging

	try {
		console.log("attempting to connect to db..."); // for debugging
		// instructs the driver to connect using the settings provided when a connection is required.
		await client.connect();
		console.log("Connected to MongoDB successfully"); // for debugging

		const dbName = "your_database_name";
		const collectionName = "your_collection_name";

		// Create references to the database and collection in order to run
		// operations on them.
		const database = client.db(dbName);
		const collection = database.collection(collectionName);

		const findQuery = { postcode: x_postcode };
		console.log(`Executing find query: ${JSON.stringify(findQuery)}`); // for debugging

		const result = await collection.find(findQuery).toArray();
		console.log(`Query result: ${result.length} documents found`);

		if (result.length === 0) {
			console.log("No records found");
			return { success: true, data: result, message: "No records found." };
		} else {
			console.log(`${result.length} records found`);
			return { success: true, data: result, message: "Records found." };
		}
	} catch (error) {
		console.error("Error in searchPostcode:", error);
		return { success: false, data: [], message: error.message };
	} finally {
		console.log("Closing MongoDB connection");
		await client.close();
	}
}
