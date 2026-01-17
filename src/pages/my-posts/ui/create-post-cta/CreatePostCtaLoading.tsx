import Skeleton from 'react-loading-skeleton';
import "./CreatePostCta.scss";

const CreatePostCtaLoading = () => {
	return (
    <div className="new-post content-container">
      <div className="new-post__avatar">
        <Skeleton circle height={40} />
      </div>
      <div className="new-post__input">
        <Skeleton />
      </div>
      <div className="new-post__action">
        <Skeleton />
      </div>
    </div>
  );
}

export default CreatePostCtaLoading