import type { ReactNode } from "react"
import "./PostActions.scss";

const PostActions = ({children}: {children: ReactNode}) => {
	return (
		<div className="post-actions">
			{children}
		</div>
	)
}

export default PostActions