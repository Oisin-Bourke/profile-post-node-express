import { ObjectId } from "mongodb"

export default interface Post {
	_id: ObjectId
	title: string
	content: string
}
