import type { ReactNode } from "react";
import "./PostItem.scss";

const PostItem = ({children}: {children: ReactNode}) => {
	return (
		<li className="post-item">
			{children}
		</li>
	)
}

export default PostItem