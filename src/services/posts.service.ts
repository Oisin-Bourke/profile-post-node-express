import { collections } from "../_helpers/db"
import Post from "../types/post"
import { ObjectId } from "mongodb"

export default {
	getPosts,
	getPost,
	createPost,
}

async function getPosts() {
	return (await collections.posts?.find({}).toArray()) as Post[]
}

async function getPost(id: string) {
	const query = { _id: new ObjectId(id) }
	return (await collections.posts?.findOne(query)) as Post
}

async function createPost(title: string, content: string, userId: string) {
	const post = {
		title,
		content,
		userId: new ObjectId(userId),
	}

	const result = await collections.posts?.insertOne(post)
	return result
}
