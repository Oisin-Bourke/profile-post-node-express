import express, { Request, Response } from "express"
import postsService from "../services/posts.service"
import Post from "../types/post"

export const postsRouter = express.Router()

postsRouter.use(express.json())

postsRouter.get("/", getPosts)
postsRouter.get("/:postId", getPost)

async function getPosts(req: Request, res: Response) {
	try {
		const { user /* category, tag etc*/ } = req.query

		let posts: Post[] = []

		if (user) {
			// get posts for a user
		} else {
			posts = await postsService.getPosts()
		}

		res.status(200).send(posts)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getPost(req: Request, res: Response) {
	try {
		const postId = req.params.postId

		const post = await postsService.getPost(postId)

		if (!post) {
			return res.status(404).send("Post not found")
		}

		res.status(200).send(post)
	} catch (error) {
		res.status(500).send(error.message)
	}
}
