import express from "express"
import { authorize } from "../middlewares/auth.middleware"
import postsController from "../controllers/posts.controller"

const postsRouter = express.Router()
postsRouter.use(express.json())

postsRouter.get("/", postsController.getPosts)
postsRouter.get("/:postId", postsController.getPost)
postsRouter.post("/", authorize, postsController.createPost)
postsRouter.put("/:postId", authorize, postsController.updatePost)
postsRouter.delete("/:postId", authorize, postsController.deletePost)

export default postsRouter