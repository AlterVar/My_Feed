import Like from "@/shared/assets/images/post/like.svg?react";
import { Button } from "@/shared/ui";
import usePostLike from "../lib/usePostLike";
import type { Props } from "../model/types";

const AddToFavourite = ({ isLiked, id }: Props) => {
	const { changeLike } = usePostLike(isLiked);

	return (
    <Button
      type={"button"}
      variant={"icon"}
      text={""}
      icon={<Like className="icon_secondary" />}
      isLiked={isLiked}
      onClick={() => changeLike(id)}
    />
  );
}

export default AddToFavourite;