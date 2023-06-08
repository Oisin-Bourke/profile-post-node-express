import express, { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { collections } from "../services/database.service"
import Post from "../models/post"

export const postsRouter = express.Router()

postsRouter.use(express.json())

// Route: /posts
postsRouter.get("/", getPosts)

async function getPosts(_req: Request, res: Response) {
	try {
		const posts = (await collections.posts
			?.find({})
			.toArray()) as unknown as Post[]
		console.log("GET POSTS", posts)

		res.status(200).send(posts)
	} catch (error) {
		res.status(500).send(error.message)
	}
}
