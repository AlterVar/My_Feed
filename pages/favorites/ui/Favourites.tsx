import useGetFavouritePosts from "../lib/useGetFavouritePosts";
import { Post, PostLoading } from "@/entities/post";
import { AddToFavourite } from "@/features/post/add-post-to-favorite";
import { ShareBtn } from "@/features/post/share-post";
import { EmptyList } from "@/widgets/empty-list";
import { PostDialog, ShareDialog } from "@/widgets/dialogs";
import { ErrorBlock } from "@/widgets/error";
import { useDialog } from "@/shared/lib";
import { PostActions, PostItem, PostList } from "@/shared/ui";
import Skeleton from "react-loading-skeleton";

const Favourites = () => {
  const { isOpenDialog, openDialog, closeDialog } = useDialog();
  const { data, loading, error, handleScrollMarkerIntersect } =
    useGetFavouritePosts();

  if (data) {
    return (
      <div className="container page-container">
        {isOpenDialog("share") && <ShareDialog closeDialog={closeDialog} />}
        {isOpenDialog("post-details") && (
          <PostDialog closeDialog={closeDialog} openDialog={openDialog} />
        )}
        {data?.favouritePosts.data.length === 0 && (
          <EmptyList
            title={"Здесь пока нет ни одного поста"}
            btn={"На главную"}
            navigation={"/"}
          />
        )}
        {data?.favouritePosts.data && data.favouritePosts.data.length > 0 && (
          <PostList handleScrollMarkerIntersect={handleScrollMarkerIntersect}>
            {data.favouritePosts.data.map((post) => (
              <PostItem key={post.id}>
                <Post post={post} type="short" openDialog={openDialog} />
                <PostActions>
                  <AddToFavourite isLiked={post.isLiked} id={post.id} />
                  <ShareBtn id={post.id} openDialog={openDialog} />
                </PostActions>
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

export default Favourites;
