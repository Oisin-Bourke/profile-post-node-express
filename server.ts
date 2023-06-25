import express, { Express } from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import helmet from "helmet"
import morgan from "morgan"
import { connectToDatabase } from "./src/_helpers/db"
import { postsRouter } from "./src/routes/posts.router"
import { usersRouter } from "./src/routes/users.router"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

async function runStart() {
	try {
		await connectToDatabase()

		// Research these middlewares!  
		app.use(cors())
		app.use(bodyParser.json())
		app.use(helmet())
		app.use(morgan("combined"))

		// Routes:
		app.use("/posts", postsRouter)
		app.use("/users", usersRouter)

		app.listen(port, () => {
			console.log(
				`[server]: Server is running at http://localhost:${port}`
			)
		})
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

runStart()
