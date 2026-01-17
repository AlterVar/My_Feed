import useGetMyPosts from "../lib/useGetMyPosts";
import { Post, PostLoading } from "@/entities/post";
import { ShareBtn } from "@/features/post/share-post";
import { EmptyList } from "@/widgets/empty-list";
import CreatePostCta from "./create-post-cta/CreatePostCta";
import { ShareDialog } from "@/widgets/dialogs";
import { MyPostDialog } from "@/widgets/dialogs/post-dialog";
import { DeletePost } from "@/features/post/delete-post";
import { ErrorBlock } from "@/widgets/error";
import { useDialog } from "@/shared/lib";
import { PostActions, PostItem, PostList } from "@/shared/ui";
import Skeleton from "react-loading-skeleton";
import CreatePostCtaLoading from "./create-post-cta/CreatePostCtaLoading";

const MyPosts = () => {
  const { isOpenDialog, openDialog, closeDialog } = useDialog();
  const { data, loading, error, user, handleScrollMarkerIntersect } =
    useGetMyPosts();

  if (data) {
    return (
      <div className="container page-container">
        {isOpenDialog("share") && <ShareDialog closeDialog={closeDialog} />}
        {isOpenDialog("post-details") && (
          <MyPostDialog closeDialog={closeDialog} openDialog={openDialog} />
        )}
        <CreatePostCta user={user} />
        {data?.myPosts.data.length === 0 && (
          <EmptyList
            title={"У Вас пока нет ни одного поста"}
            btn={"Создать пост"}
            navigation={"./create-post"}
          />
        )}
        {data?.myPosts.data && data.myPosts.data.length > 0 && (
          <PostList handleScrollMarkerIntersect={handleScrollMarkerIntersect}>
            {data.myPosts.data.map((post) => (
              <PostItem key={post.id}>
                <div className="desktop-only actions actions_top">
                  <PostActions>
                    <ShareBtn id={post.id} openDialog={openDialog} />
                    <DeletePost id={post.id} mediaUrl={post.mediaUrl} />
                  </PostActions>
                </div>
                <Post post={post} type="short" openDialog={openDialog} />
                <div className="mobile-only">
                  <PostActions>
                    <ShareBtn id={post.id} openDialog={openDialog} />
                    <DeletePost id={post.id} mediaUrl={post.mediaUrl} />
                  </PostActions>
                </div>
              </PostItem>
            ))}
          </PostList>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container page-container">
        <CreatePostCtaLoading />
        <PostList handleScrollMarkerIntersect={handleScrollMarkerIntersect}>
          <PostItem>
            <PostLoading type={"short"} />
            <PostActions>
              <Skeleton width={24} height={24} />
              <Skeleton width={24} height={24} />
            </PostActions>
          </PostItem>
        </PostList>
      </div>
    );
  }
  if (error) return <ErrorBlock errorCode={"500"} />;
};

export default MyPosts;
