import Skeleton from "react-loading-skeleton";
import type { PostLoadingProps } from "../model/types";
import "./Post.scss";

const PostLoading = ({ type }: PostLoadingProps) => {
  return (
    <article className="post">
      <div className="post__header author">
        <div className="author__avatar">
          <Skeleton width={40} height={40} circle />
        </div>
        <div className="author__container">
          <p className="author__name">
            <Skeleton width={126} height={14} borderRadius={20} />
          </p>
          <Skeleton width={68} height={12} borderRadius={17} />
        </div>
      </div>
      <div className="post__body">
        <h2 className="post__title">
          <Skeleton width={333} height={16} borderRadius={22} />
        </h2>
        <div className="post__image">
          <Skeleton />
        </div>
        <p className="post__description">
          <span className={`post__description_${type}`}>
            <Skeleton
              height={14}
              borderRadius={20}
              count={type === "short" ? 3 : 6}
            />
          </span>
        </p>
      </div>
    </article>
  );
};

export default PostLoading;
