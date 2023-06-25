import * as mongodb from "mongodb"
import * as dotenv from "dotenv"

export const collections: { posts?: mongodb.Collection } = {}

export async function connectToDatabase() {
	dotenv.config()

	const client = new mongodb.MongoClient(process.env.MONGO_URI || "", {
		serverApi: {
			version: mongodb.ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true,
		},
	})

	await client.connect()

	const db: mongodb.Db = client.db(process.env.MONGO_DB_NAME)

	const postsCollection: mongodb.Collection = db.collection(
		process.env.MONGO_DB_COLLECTION_NAME || ""
	)
    
	// Persisted connection to collections
    collections.posts = postsCollection

	console.log(
		`Successfully connected to database: ${db.databaseName} and collection: ${postsCollection.collectionName}`
	)
}

// add schema validation
