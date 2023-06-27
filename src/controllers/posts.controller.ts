import { Request, Response } from "express"
import postsService from "../services/posts.service"
import msg from "../utils/responseMsg"
import Post from "../types/post"
import User from "../types/user"

export default {
	getPosts,
	getPost,
	createPost,
	updatePost,
	deletePost,
}

async function getPosts(req: Request, res: Response) {
	try {
		const { user /* category, tag etc*/ } = req.query

		let posts: Post[] = []

		if (user) {
			// get posts for a user
		} else {
			posts = await postsService.getPosts()
		}

		return res.status(200).json(posts)
	} catch (error) {
		return res.status(500).json(error.message)
	}
}

async function getPost(req: Request, res: Response) {
	try {
		const postId = req.params.postId

		const post = await postsService.getPost(postId)

		if (!post) {
			return res.status(404).json(msg.NotFound)
		}

		return res.status(200).json(post)
	} catch (error) {
		return res.status(500).json(error.message)
	}
}

async function createPost(req: Request, res: Response) {
	try {
		const user = req.user as User
		const post = req.body as Post

		const result = await postsService.createPost(post, user)

		if (!result) {
			return res.status(500).json({ message: msg.FailedToCreateResource })
		}

		res.set("Location", `/posts/${result?.insertedId}`)
		return res.status(201).json({ postId: result?.insertedId })
	} catch (error) {
		return res.status(500).json(error.message)
	}
}

async function updatePost(req: Request, res: Response) {
	try {
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deletePost(req: Request, res: Response) {
	try {
	} catch (error) {
		return res.status(500).send(error.message)
	}
}
