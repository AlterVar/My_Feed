import { Post, PostLoading } from "@/entities/post";
import { Dialog } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import { PostActions, PostItem } from "@/shared/ui";
import { AddToFavourite } from "@/features/post/add-post-to-favorite";
import { ShareBtn } from "@/features/post/share-post";
import useFindPost from "../lib/useFindPost";
import type { Props } from "../model/types";
import Skeleton from "react-loading-skeleton";


const PostDialog = ({ closeDialog, openDialog }: Props) => {
  const navigate = useNavigate();
  const { post, loading } = useFindPost();
  const clearSearch = () => {
    closeDialog();
    navigate(location.pathname);
  };

	if (loading) {
    return (
      <Dialog post variant={"center"} onClose={clearSearch}>
        <PostItem>
          <PostLoading type={"long"} />
          <PostActions>
            <Skeleton width={24} height={24} />
            <Skeleton width={24} height={24} />
          </PostActions>
        </PostItem>
      </Dialog>
    );
  }
  if (!post) return null;

  return (
    <Dialog post variant={"center"} onClose={clearSearch}>
      <PostItem>
        <Post post={post} type={"long"} />
        <PostActions>
          <AddToFavourite isLiked={post.isLiked} id={post.id} />
          <ShareBtn openDialog={openDialog} id={post.id} />
        </PostActions>
      </PostItem>
    </Dialog>
  );
};

export default PostDialog;
