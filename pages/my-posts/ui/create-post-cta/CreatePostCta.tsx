import "./CreatePostCta.scss";
import Avatar from "@/shared/assets/images/user/avatar-default.svg?react";
import Add from "@/shared/assets/images/post/add.svg?react";
import { Button } from "@/shared/ui";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { CtaProps } from "../../model/types";

const CreatePostCta = ({user}: CtaProps) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const goToCreatePost = () => {
    navigate("./create-post", {
      state: {
        title: titleRef.current?.value,
      },
    });
  };

  return (
    <div className="new-post content-container">
      <div className="new-post__avatar">
        {!user?.avatarUrl && <Avatar width={38} height={38} />}
        {user?.avatarUrl && (
          <img
            src={user.avatarUrl}
            alt="аватар"
            onError={(e) =>
              ((e.target as HTMLImageElement).src =
                "src/shared/assets/images/user/avatar-default.svg")
            }
          />
        )}
      </div>
      <input
        className="new-post__input"
        type="text"
        placeholder={`Что у вас нового, ${user?.firstName ?? "незнакомец"}?`}
        ref={titleRef}
      />
      <div className="new-post__action desktop-only">
        <Button
          type={"button"}
          variant={"primary"}
          size={"small"}
          text={"Создать пост"}
          onClick={goToCreatePost}
        />
      </div>
      <div className="new-post__action mobile-only">
        <Button
          type={"button"}
          variant={"primary"}
          text={<Add />}
          onClick={goToCreatePost}
        />
      </div>
    </div>
  );
};

export default CreatePostCta;
