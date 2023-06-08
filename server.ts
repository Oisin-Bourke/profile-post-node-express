import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import helmet from "helmet"
import morgan from "morgan"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
app.use(morgan("combined"))


// Temporary data
const posts = [
	{
		title: "Post 1",
		content: "This is the first post",
	},
	{
		title: "Post 2",
		content: "This is the second post",
	},
	{
		title: "Post 3",
		content: "This is the third post",
	},
]

app.get("/", (req: Request, res: Response) => {
	res.send(posts)
})

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`)
})
