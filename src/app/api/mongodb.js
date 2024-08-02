import { MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// temp hard coded postcode
// const postcode = "BN1 8AB";

export default async function searchPostcode(x_postcode) {
	// Connection URI and client creation
	const uri = process.env.MONGODB_URI;
	const client = new MongoClient(uri);

	try {
		// instructs the driver to connect using the settings provided when a connection is required.
		await client.connect();

		const dbName = "your_database_name";
		const collectionName = "your_collection_name";

		// Create references to the database and collection in order to run
		// operations on them.
		const database = client.db(dbName);
		const collection = database.collection(collectionName);

		const findQuery = { postcode: x_postcode };

		const result = await collection.find(findQuery).toArray();

		if (result.length === 0) {
			return { success: true, data: result, message: "No records found." };
		} else {
			return { success: true, data: result, message: "Records found." };
		}
	} catch (error) {
		return { success: false, data: [], message: error.message };
	} finally {
		await client.close();
	}
}
