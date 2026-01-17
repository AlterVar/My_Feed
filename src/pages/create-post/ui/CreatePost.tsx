import { CreatePostForm } from "@/features/post/create-post";
import "./CreatePost.scss";
import { BackLink } from "@/shared/ui";

const CreatePost = () => {
  return (
		<div className="create-post container page-container">
			<BackLink text={"Мои посты"} path={"/my-posts"} />
      <div className="content-container">
        <h1 className="create-post__title desktop-only">Создание поста</h1>
        <CreatePostForm />
      </div>
    </div>
  );
};

export default CreatePost;
