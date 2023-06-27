import { collections } from "../utils/db"
import Post from "../types/post"
import User from "../types/user"
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

async function createPost(post: Post, user: User) {
	const { title, content } = post
	const { id, name } = user

	const newPost = {
		title,
		content,
		author: name,
		userId: new ObjectId(id),
	}

	return await collections.posts?.insertOne(newPost)
}
