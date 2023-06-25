import express, { Request, Response } from "express"
import postsService from "../services/posts.service"
import { authorize } from "../middlewares/auth"

export const usersRouter = express.Router()

usersRouter.use(express.json())

usersRouter.post("/:userId/posts", authorize, createPost)
usersRouter.put("/:userId/posts/:postId", updatePost)
usersRouter.delete("/:userId/posts/:postId", deletePost)

async function createPost(req: Request, res: Response) {
	try {
		const { userId } = req.params
		const { title, content } = req.body
		console.log("body", req.body)

		console.log('token user', req.user)

		const result = await postsService.createPost(title, content, userId)

		if (!result) {
			res.status(500).json({ message: "Failed to create resource" })
		}

		const location = `/posts/${result?.insertedId}`
		res.set("Location", location)
		return res.status(201).json({ postId: result?.insertedId })
	} catch (error) {
		res.status(500).json(error.message)
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
