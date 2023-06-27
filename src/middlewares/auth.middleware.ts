import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import User from "../types/user"
import msg from "../utils/responseMsg"

export const authorize = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ message: msg.AuthenticationRequired })
	}

	const token = authHeader.slice(7)

	try {
		const user = jwt.verify(
			token,
			process.env.NEXTAUTH_SECRET as string
		) as User

		if (!user) {
			return res.status(401).json({ message: msg.AuthenticationRequired })
		}

		req.user = user
		next()
	} catch (error) {
		console.error(error)
		return res.status(401).json({ message: msg.AuthenticationRequired })
	}
}
