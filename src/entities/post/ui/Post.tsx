import "./Post.scss";
import DefaultAvatar from "@/shared/assets/images/user/avatar-default.svg?react";
import type { Props } from "../model/types";
import { format } from "date-fns";
import { Button } from "@/shared/ui";

const Post = ({ post, type, openDialog }: Props) => {
  return (
    <article className="post">
      <div className="post__header author">
        <div className="author__avatar">
          {post.author.avatarUrl ? (
            <img
              src={post.author.avatarUrl}
              alt=""
              width={40}
              height={40}
              onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  "src/shared/assets/images/user/avatar-default.svg")
              }
            />
          ) : (
            <DefaultAvatar width={40} height={40} />
          )}
        </div>
        <div className="author__container">
          <p className="author__name">{`${post.author.firstName} ${post.author.lastName}`}</p>
          <time dateTime={post.createdAt} className="post__created-at">
            {format(new Date(post.createdAt), "dd.MM.yyyy")}
          </time>
        </div>
      </div>
      <div
        className="post__body"
        onClick={() => openDialog && openDialog("post-details", post.id)}
      >
        <h2 className="post__title">{post.title}</h2>
        <div className="post__image">
          <img
            src={post.mediaUrl}
            alt=""
            onError={(e) =>
              ((e.target as HTMLImageElement).src =
                "src/shared/assets/images/post/post-fallback.png")
            }
          />
        </div>
        <p className="post__description">
          <span className={`post__description_${type}`}>
            {post.description}
          </span>
          {type === "short" && (
            <Button type={"button"} variant={"flat"} text={"Читать больше"} />
          )}
        </p>
      </div>
    </article>
  );
};

export default Post;
