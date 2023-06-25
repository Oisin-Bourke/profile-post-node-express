import express, { Request, Response } from "express"
import postsService from "../services/posts.service"
import Post from "../types/post"

export const usersRouter = express.Router()

usersRouter.use(express.json())

usersRouter.post("/:userId/posts", createPost)
usersRouter.put("/:userId/posts/:postId", updatePost)
usersRouter.delete("/:userId/posts/:postId", deletePost)

async function createPost(req: Request, res: Response) {
	try {
		const { userId } = req.params
		const { title, content } = req.body
		console.log("body", req.body)

		const result = await postsService.createPost(title, content, userId)

		if (result?.acknowledged) {
			const location = `/users/${userId}/posts/${result.insertedId}`
			res.set("Location", location)
			return res.status(201).json({ postId: result.insertedId })
		}

		res.status(500).send("Error inserting new document")
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updatePost(req: Request, res: Response) {
	try {
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function deletePost(req: Request, res: Response) {
	try {
	} catch (error) {
		res.status(500).send(error.message)
	}
}
