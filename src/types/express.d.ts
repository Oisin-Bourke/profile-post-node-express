import { Request } from "express"
import User from "./user"

declare module "express" {
	interface Request {
		user?: User
	}
}
